import { SchoolClass } from '../models/school-session.model';
import { SchoolStudent } from '../models/school-term.model';

export interface SchoolClass {
  school_id: string;
  name: string;
  unique_field: string;
  priority_1: string;
  priority_2: string;
  priority_3: string;
  urls: object;
  form_structure: object;
}
export interface SchoolStudent {
  school_id: string;
  class_id: string;
  unique_answer: string;
  priority_1_answer: string;
  priority_2_answer: string;
  priority_3_answer: string;
  form: string;
}

