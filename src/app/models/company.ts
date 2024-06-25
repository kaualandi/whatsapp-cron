export interface ICompany {
  id: number;
  logo: string;
  logo_dark: string;
  logo_url: string;
  logo_dark_url: string;
  ip_log_robo: string;
  token_log_robo: string;
  name: string;
  cnpj: string;
  contact_phone: string;
  contact_email: string;
  days_to_pay_pix_qr_code: number;
  due_date: number;
  pix_pay_enabled: boolean;
  bank_slip_interests_percentage: number;
  bank_slip_penaulty_percentage: number;
  hours_to_error_in_receipt: number;
  first_message_resend_pix_copia_e_cola_to_whatsapp: string;
  second_message_resend_pix_copia_e_cola_to_whatsapp: string;
  message_confirm_payment_to_deliveryman: string;
  message_confirm_payment_to_client: string;
  second_message_confirm_payment_to_client: string;
  first_message_send_pix_copia_cola_to_whatsapp: string;
  second_message_send_pix_copia_cola_to_whatsapp: string;
  first_message_send_pix_email: string;
  second_message_send_pix_email: string;
  enable_request_create_invoice: boolean;
  enable_request_set_invoice_close: boolean;
  enable_request_robo_update_partial_unfolding: boolean;
  enable_request_robo_update_unfolding: boolean;
  created_at: string;
  updated_at: string;
}

export interface ITokenCompany {
  token: string;
  company: ICompany;
}

export type TFiscalNoteStatus =
  | "CANCELED"
  | "GENERATED QR CODE"
  | "SEND QR CODE"
  | "PROCESSING"
  | "PAID PIX"
  | "PAID DH"
  | "ERROR"
  | "EXPIRED";

export interface IFiscalNote {
  id: number;
  qr_code: {
    id: number;
    qr_code_id: number;
    payment_date: string;
    status: string;
    text: string;
    base64_text: string;
    base64_image: string;
    document_id: string;
    transaction_identification: string;
    value: number;
    pix_type: string;
    finished_pix: boolean;
    uuid: string;
    loc_id: string;
    tx_id: string;
    expiration_date: string;
    debtor_document: string;
    debtor_name: string;
    receiver_document: string;
    is_pj: boolean;
    original_value: number;
    key: string;
    payer_request: string;
    fees_modality: string;
    fees_value: string;
    fine_modality: string;
    fine_value: string;
    discount_modality: string;
    discount_value: string;
    abatement_modality: string;
    abatement_value: string;
    pix_copy_and_paste: string;
    validity_after_expiration: string;
    created_at: string;
    updated_at: string;
    company: number;
    pix_key: string;
    user: number;
  };
  deliveryman_obj: {
    id: number;
    name: string;
    license_plate: string;
    phone: string;
    created_at: string;
    updated_at: string;
    company: number;
  };
  status: TFiscalNoteStatus;
  account_number: string;
  value: number;
  value_parcial_qrcode: number;
  invoice_number: number;
  nfe_number: string;
  invoice_created_date: string;
  departure_date: string;
  car_number: string;
  debtor_name: string;
  debtor_cpf: string;
  debtor_cnpj: number;
  filial_code: string;
  payment_date: string | null;
  num_trans_venda: string;
  cod_cob: string;
  phone_debtor: string;
  email_debtor: string;
  error_on_generate_qr_code: string;
  date_try_generate_qr_code: string;
  error_s3_generate_qr_code: string;
  seller_name: string;
  seller_phone: string;
  due_date: string;
  invoice_close_whitor: boolean;
  paid_whatsapp_message_sent_to_customer: boolean;
  erro_paid_wpp_message_sent_to_customer: boolean;
  paid_sms_message_sent_to_customer: boolean;
  paid_whatsapp_message_sent_to_delivery_man: boolean;
  erro_paid_wpp_message_sent_to_delivery_man: boolean;
  paid_sms_message_sent_to_delivery_man: boolean;
  sent_qrcode_pix_whatsapp_message_to_customer: boolean;
  erro_sent_qrcode_pix_wpp_message_to_customer: boolean;
  sent_qrcode_pix_email_to_customer: boolean;
  created_at: string;
  updated_at: string;
  pix_key: number;
  company: number;
  qr_code_static: string;
  delivery_man: number;
}
