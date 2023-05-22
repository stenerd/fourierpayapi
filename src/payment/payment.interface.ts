export interface IInitializePayment {
  payer_id?: string;
  payment_link_id?: string;
  reciever_id?: string;
  unique_field?: string;
  unique_answer?: string;
  priority_1?: string;
  priority_1_answer?: string;
  priority_2?: string;
  priority_2_answer?: string;
  priority_3?: string;
  priority_3_answer?: string;
  amount: number;
  charges: number;
  form: Record<string, any>;
}
