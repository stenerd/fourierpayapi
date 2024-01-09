import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { CoreService } from 'src/common/core/service.core';
import { SchoolSessionRepository } from './repositories/school-session.repository';
import { SchoolSessionSettingRepository } from './repositories/school-session-setting.repository';
import { SchoolSessionFactory } from './factories/school-session.factory';
import {
  ICreateSchoolSessionResponse,
  ICreateSessionPayload,
  ISchoolSessionPayload,
} from './interfaces/school-session.interface';
import { SchoolTermRepository } from './repositories/school-term.repository';
import { SchoolTermFactory } from './factories/school-term.factory';
import { SchoolSessionSettingFactory } from './factories/school-session-setting.factory';
import { UpdateSchoolSessionSettingDto } from './dtos/school-session.dto';

@Injectable()
export class SchoolSessionService extends CoreService<SchoolSessionRepository> {
  constructor(
    private readonly repository: SchoolSessionRepository,
    private readonly schoolSessionSettingRepository: SchoolSessionSettingRepository,
    private readonly schoolTermRepository: SchoolTermRepository,
    private readonly factory: SchoolSessionFactory,
    private readonly schoolTermFactory: SchoolTermFactory,
    private readonly schoolSessionSettingFactory: SchoolSessionSettingFactory,
  ) {
    super(repository);
  }


  async getSession(school_id: string) {
    try {
      const session = await this.repository.find(
        { school_id },
        {},
        { populate: [{ path: 'school_id' }, { path: 'session_setting_id' }] }
      )
      return session
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  async editSession(setting_id: string, data: UpdateSchoolSessionSettingDto) {
    try {
      const updated_settings = await this.schoolSessionSettingRepository.findOneAndUpdate({ _id: setting_id }, data, {})
      return updated_settings
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  async createSession(
    payload: ICreateSessionPayload
  ): Promise<ICreateSchoolSessionResponse> {
    try {
      const data = await this.schoolSessionSettingRepository.findOne({
        name: payload.data.name
      })
      if (data) throw new ConflictException(`Session with name ${payload.data.name} has been created`)
      const new_session_setting = await this.schoolSessionSettingFactory.createNew(payload.data)
      const session_setting = await this.schoolSessionSettingRepository.create(new_session_setting)

      const new_session = await this.createSchoolSession({
        school_id: payload.school_id,
        session_setting_id: session_setting._id
      })
      return new_session
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  async createSchoolSession(
    payload: ISchoolSessionPayload,
  ): Promise<ICreateSchoolSessionResponse> {
    const school_session_setting =
      await this.schoolSessionSettingRepository.findOne({
        _id: payload.session_setting_id,
      });
    if (!school_session_setting)
      throw new BadRequestException('Session does not exist.');

    const existing_school_session = await this.repository.findOne(
      {
        school_id: payload.school_id,
        session_setting_id: payload.session_setting_id,
      },
      {},
      {
        populate: ['session_setting_id'],
      },
    );

    if (existing_school_session)
      throw new BadRequestException('You have already created this session');

    const new_school_session = this.factory.createNew(payload);
    const school_session = await this.repository.create(new_school_session);

    const new_school_term = this.schoolTermFactory.createNew({
      school_id: payload.school_id,
      session_id: school_session._id,
      session_setting_id: payload.session_setting_id,
      number_of_term: 3,
    });

    const school_term = await this.schoolTermRepository.createMany(
      new_school_term,
    );

    return { school_session, school_term };
  }

  async onboardingSchoolSession(
    school_id: string,
  ): Promise<ICreateSchoolSessionResponse> {
    const { start_year, end_year } =
      this.schoolTermFactory.getStartAndEndYear();

    const get_session_setting =
      await this.schoolSessionSettingRepository.findOne({
        start_year,
        end_year,
      });

    if (!get_session_setting) {
      const new_school_session_setting =
        this.schoolSessionSettingFactory.generateNew({ start_year, end_year });
      const create_session_setting =
        await this.schoolSessionSettingRepository.create(
          new_school_session_setting,
        );

      return this.createSchoolSession({
        school_id,
        session_setting_id: create_session_setting._id,
      });
    }

    return this.createSchoolSession({
      school_id,
      session_setting_id: get_session_setting._id,
    });
  }

  //   async fetchSubscriptions(
  //     user_id: string,
  //     status: FetchSubscriptionSettingFilterEnum = null,
  //   ) {
  //     const existing_subscriptions = await this.repository.find(
  //       {
  //         user_id: user_id,
  //         ...(status && {
  //           is_active: status == FetchSubscriptionSettingFilterEnum.ACTIVE,
  //         }),
  //       },
  //       {},
  //       {
  //         populate: ['subscription_setting_id'],
  //       },
  //     );

  //     return existing_subscriptions;
  //   }
}
