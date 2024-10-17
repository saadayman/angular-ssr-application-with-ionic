import { ERP_DEFAULT_ORDER_TYPE } from "./erp/cpoe";

export type Docstatus = 0 | 1 | 2;
export type CheckBox = 0 | 1;

export interface I_PRACTITIONER {
  name: string;
  creation: string;
  modified: string;
  modified_by: string;
  owner: string;
  docstatus: number;
  image: string;
  user_type: string;
  practitioner_id: string;
  healthcare_practitioner_level: null;
  practitioner_name: string;
  user_id: string;
  user_name: string;
  arabic_user_name: null;
  active_medical: number;
  session_expiry: number;
  favorites_list_limit: number;
  appointment_type_favorite: any[];
  clinical_procedure_template_favorite: any[];
  healthcare_package_favorite: any[];
  lab_test_template_favorite: any[];
  medical_code_favorite: any[];
  medication_favorite: any[];
  np_discount_profile: any[];
  radiology_procedure_template_favorite: any[];
  medical_user_branch: any[];
  default_warehouse: string;
  company: string;
  department: string;
  department_arabic: string;
  designation: string;
  hide_icon_covid_19: 1 | 0;
  hide_patient_mobile: 1 | 0;
  hide_search_calendar: 1 | 0;
  hide_other_practitioner: 1 | 0;
  outpatient_list: 1 | 0;
  procedure_list: 1 | 0;
  inpatient_list: 1 | 0;
  sport_list: 1 | 0;
  default_list: default_list;
  medication_controlled: CheckBox;
  package_request_appointment: CheckBox;
  medical_tutorial: 1 | 0;
  allow_telemedicine: 1 | 0;
  sign_off: 1 | 0;
  summary: 1 | 0;
  future_appointments: 1 | 0;
  dashboard: 1 | 0;
  calendar: 1 | 0;
  patient_search: 1 | 0;
  lab_results: 1 | 0;
  external_report: 1 | 0;
  document_management: 1 | 0;
  default_filter_in_patient_list: default_filter_in_patient_list;
  vital: 1 | 0;
  patient_timeline: 1 | 0;
  patient_history: 1 | 0;
  patient_allergy: 1 | 0;
  order: 1 | 0;
  patients_problem_management: 1 | 0;
  appointment_note: 1 | 0;
  comments: 1 | 0;
  outcome_measures: 1 | 0;
  status_1: 1 | 0;
  status_2: 1 | 0;
  status_3: 1 | 0;
  status_4: 1 | 0;
  status_5: 1 | 0;
  medication_orders: 1 | 0;
  item_orders: 1 | 0;
  lab_orders: 1 | 0;
  procedure_orders: 1 | 0;
  radiology_orders: 1 | 0;
  package_orders: 1 | 0;
  appointment_orders: 1 | 0;
  service_orders: 1 | 0;
  education_orders: 1 | 0;
  secret_key: string;
  mobile: null;
  clipboard: 1 | 0;
  payor_request: 1 | 0;
  sick_leave: 1 | 0;
  mandatory_problem: 1 | 0;
  role_1: 1 | 0;
  role_2: 1 | 0;
  role_3: 1 | 0;
  role_4: 1 | 0;
  role_5: 1 | 0;
  role_6: 1 | 0;
  role_7: 1 | 0;
  role_8: 1 | 0;
  role_9: 1 | 0;
  role_10: 1 | 0;
  socket_admin: 1 | 0;
  socket: 1 | 0;
  pain_assessment_and_management: 1 | 0;
  episode: 1 | 0;
  mandatory_branch_for_the_approval_request: 1 | 0;
  print_summary: 1 | 0;
  refresh_after: 1 | 0;
  auto_refresh: 1 | 0;
  auto_refresh_timer: 9999;
  chat: 1 | 0;
  okadoc_telemedicine: 1 | 0;
  insurance: 1 | 0;
  patient_education: 1 | 0;
  fall_assessment: 1 | 0;
  allow_arrival_in_his: 1 | 0;
  extra_order: 1 | 0;
  default_order_type: ERP_DEFAULT_ORDER_TYPE;
}

export interface NP_Medical_User_Settings {
  name: string;
  creation: string;
  modified: string;
  modified_by: string;
  owner: string;
  docstatus: number;
  image: string;
  user_type: string;
  practitioner_id: string;
  healthcare_practitioner_level: null;
  practitioner_name: string;
  user_id: string;
  user_name: string;
  arabic_user_name: null;
  active_medical: number;
  session_expiry: number;
  favorites_list_limit: number;
  appointment_type_favorite: any[];
  clinical_procedure_template_favorite: any[];
  healthcare_package_favorite: any[];
  lab_test_template_favorite: any[];
  medical_code_favorite: any[];
  medication_favorite: any[];
  np_discount_profile: NP_Discount_Profile[];
  radiology_procedure_template_favorite: any[];
  medical_user_branch: any[];
  
  company: string;
  department: string;
  department_arabic: string;
  designation: string;
  hide_icon_covid_19: 1 | 0;
  hide_patient_mobile: 1 | 0;
  hide_search_calendar: 1 | 0;
  hide_other_practitioner: 1 | 0;
  outpatient_list: 1 | 0;
  procedure_list: 1 | 0;
  inpatient_list: 1 | 0;
  sport_list: 1 | 0;
  default_list: default_list;
  medical_tutorial: 1 | 0;
  allow_telemedicine: 1 | 0;
  sign_off: 1 | 0;
  summary: 1 | 0;
  future_appointments: 1 | 0;
  dashboard: 1 | 0;
  calendar: 1 | 0;
  patient_search: 1 | 0;
  lab_results: 1 | 0;
  external_report: 1 | 0;
  document_management: 1 | 0;
  default_filter_in_patient_list: default_filter_in_patient_list;
  vital: 1 | 0;
  patient_timeline: 1 | 0;
  patient_history: 1 | 0;
  patient_allergy: 1 | 0;
  order: 1 | 0;
  patients_problem_management: 1 | 0;
  appointment_note: 1 | 0;
  comments: 1 | 0;
  outcome_measures: 1 | 0;
  status_1: 1 | 0;
  status_2: 1 | 0;
  status_3: 1 | 0;
  status_4: 1 | 0;
  status_5: 1 | 0;
  medication_orders: 1 | 0;
  item_orders: 1 | 0;
  lab_orders: 1 | 0;
  procedure_orders: 1 | 0;
  radiology_orders: 1 | 0;
  package_orders: 1 | 0;
  appointment_orders: 1 | 0;
  service_orders: 1 | 0;
  education_orders: 1 | 0;
  secret_key: string;
  mobile: null;
  clipboard: 1 | 0;
  payor_request: 1 | 0;
  sick_leave: 1 | 0;
  mandatory_problem: 1 | 0;
  role_1: 1 | 0;
  role_2: 1 | 0;
  role_3: 1 | 0;
  role_4: 1 | 0;
  role_5: 1 | 0;
  role_6: 1 | 0;
  role_7: 1 | 0;
  role_8: 1 | 0;
  role_9: 1 | 0;
  role_10: 1 | 0;
  socket_admin: 1 | 0;
  socket: 1 | 0;
  pain_assessment_and_management: 1 | 0;
  episode: 1 | 0;
  mandatory_branch_for_the_approval_request: 1 | 0;
  print_summary: 1 | 0;
  refresh_after: 1 | 0;
  auto_refresh: 1 | 0;
  auto_refresh_timer: 9999;
  chat: 1 | 0;
  okadoc_telemedicine: 1 | 0;
  insurance: 1 | 0;
  patient_education: 1 | 0;
  fall_assessment: 1 | 0;
  allow_arrival_in_his: 1 | 0;
  extra_order: 1 | 0;
  default_order_type: ERP_DEFAULT_ORDER_TYPE;
}

export interface NP_Discount_Profile {
  name: string;
  owner: string;
  creation: string;
  modified: string;
  modified_by: string;
  docstatus: Docstatus;
  idx: number;
  category: NP_Discount_Profile_category;
  maximum_discount_percentage: number;
  parent: string;
  parentfield: string;
  parenttype: string;
  doctype: string;
}
export type NP_Discount_Profile_category = 'NP Clinical Procedure' | 'NP Appointment Type' | 'NP Inpatient' | 'NP Lab Test' | 'NP Medication' | 'NP Radiology Procedure'

export interface Comment {
  comment_by: string;
  comment_email: string;
  comment_type: string;
  content: string;
  creation: string;
  docstatus: number;
  idx: number;
  ip_address: string;
  link_doctype: string;
  link_name: string;
  modified: string;
  modified_by: string;
  name: string;
  owner: string;
  parent: string;
  parentfield: string;
  parenttype: string;
  published: number;
  reference_doctype: string;
  reference_name: string;
  reference_owner: string;
  subject: string;
}
export interface PatientCategory {
  color: string;
  creation: string;
  docstatus: number;
  flag: number;
  fontawesome: any;
  idx: number;
  modified: string;
  modified_by: string;
  name: string;
  owner: string;
  patient_category: string;
  text_color: string;
}
export interface Patient {
  name: string;
  creation: string;
  modified: string;
  modified_by: string;
  owner: string;
  docstatus: number;
  parent: null | string;
  parentfield: null | string;
  parenttype: null | string;
  idx: number;
  naming_series: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  patient_name: string;
  sex: string;
  blood_group: string;
  dob: string;
  image: string;
  status: string;
  uid: null | string;
  inpatient_record: null | string;
  inpatient_status: string;
  report_preference: string;
  mobile: string;
  phone: null | string;
  email: string;
  invite_user: number;
  user_id: null | string;
  customer: string;
  customer_group: string;
  territory: string;
  default_currency: string;
  default_price_list: string;
  language: string;
  occupation: null | string;
  marital_status: string;
  allergies: null | string;
  medication: null | string;
  medical_history: null | string;
  surgical_history: null | string;
  tobacco_past_use: null | string;
  tobacco_current_use: null | string;
  alcohol_past_use: null | string;
  alcohol_current_use: null | string;
  surrounding_factors: null | string;
  other_risk_factors: null | string;
  patient_details: null | string;
  _user_tags: null | string;
  _comments: string[];
  _assign: null | string;
  _liked_by: null | string;
  nationality: string;
  nid_or_iqama_id: string;
  consent_form: null | string;
  consent_form_created: number;
  verified: number;
  id_type: string;
  patient_identification: null | string;
  date_of_joining: string;
  speaking_language: string;
  country: string;
  city: string;
  address: string;
  consent_form_id: null | string;
  disabled: number;
  barcode_svg: null | string;
  mobile_password: null | string;
  mobile_account_verification: number;
  full_name_in_arabic: string;
  verified_by_patient: number;
  patient_source: string;
  marital_status_2: string;
  patient_classification: string;
  hijri_date_of_birth: string;
  sfh_no: null | string;
  second_mobile_number: string;
  accept_advertisement: string;
  patient_class: string;
  patient_category: string;
  first_name_a: string;
  middle_name_a: string;
  last_name_a: string;
}

export interface Problem {
  name: string;
  creation: string;
  modified: string;
  modified_by: string;
  owner: string;
  docstatus: number;
  parent: string | null;
  parentfield: string | null;
  parenttype: string | null;
  idx: number;
  problem_id: string;
  medical_code: string;
  code_description: string;
  code: string;
  problem_type: string;
  start_date: string | null;
  status: string;
}

export interface Episode {
  name: string;
  creation: string;
  modified: string;
  modified_by: string;
  owner: string;
  docstatus: number;
  parent: string | null;
  parentfield: string | null;
  parenttype: string | null;
  idx: number;
  naming_series: string;
  patient: string;
  patient_name: string;
  full_name_in_arabic: string;
  nationality: string;
  nid_or_iqama_id: string;
  mobile: string;
  gender: string;
  date_of_birth: string;
  blood_group: string;
  age: string;
  date_of_joining: string;
  country: string;
  city: string;
  address: string;
  title: string;
  episode_status: string;
  start_date: string;
  end_date: string;
  last_transaction_date: string | null;
  summary: string;
  sign_and_symptoms: string;
  generated_by_id: string;
  generated_by: string;
  signed_off_by_id: string | null;
  signed_off_by: string | null;
  _user_tags: any[] | null;
  _comments: any[] | null;
  _assign: any[] | null;
  _liked_by: any[] | null;
  other_note: string;
  planned_discharge_date: string | null;
  discharge_date: string | null;
  discharge_note: string;
  discharge_type: string;
  instruction_after_discharge: string;
  problem: Problem[];
}
export interface Stage {
  "stage": string,
  "completed": number,
  "idx": number,
  "completed_date_and_time": string,
  "generated_by": string,
  "generated_by_id": string,
  "start_time": string,
  "end_time": string,
  "track_duration": string,
  "active_tracking": boolean,
  "planned_duration":string
}
// ----------------------------------------
export type default_list = "Outpatient List" | "Procedure List";
export type default_filter_in_patient_list =
  | "All Appointments"
  | "Closed and Checked Out Appointments"
  | "Show All Except Canceled Appointments"
  | "In Progress Appointments"
  | "Arrived Appointments"
  | "Open, Pending and Scheduled Appointments"
  | "Canceled and No Show Appointments"
  | "Telemedicine Appointments";

  export interface NP_Patient_Record_Flag {
    name: string;
    creation: string;
    modified: string;
    modified_by: string;
    owner: string;
    docstatus: number;
    parent: any;
    parentfield: any;
    parenttype: any;
    idx: number;
    naming_series: string;
    patient: string;
    patient_name: string;
    nationality: string;
    nid_or_iqama_id: string;
    mobile: string;
    gender: string;
    date_of_birth: string;
    date_of_joining: string;
    country: string;
    city: string;
    address: string;
    company: string;
    active: number;
    flag: any;
    _user_tags: any;
    _comments: any;
    _assign: any;
    _liked_by: any;
    status: string;
    on_medical_department: CheckBox;
    flag_type: string;
    on_practitioner: CheckBox;
    flag_details: any;
    departments: NP_Flags_on_Departments[];
    practitioner: NP_Flags_on_Practitioner[];
}

  export interface NP_Flags_on_Practitioner {
    name: string;
    creation: string;
    modified: string;
    modified_by: string;
    owner: string;
    docstatus: Docstatus;
    idx: number;
    practitioner: string;
    practitioner_name: string;
    practitioner_department: string;
    parent: string;
    parentfield: string;
    parenttype: string;
}
export interface NP_Flags_on_Departments {
  name: string;
  creation: string;
  modified: string;
  modified_by: string;
  owner: string;
  docstatus: Docstatus;
  idx: number;
  medical_department: string;
  parent: string;
  parentfield: string;
  parenttype: string;
}
// ------------------------------------
export interface NP_Healthcare_Practitioner {
  name: string;
  owner: string;
  creation: string;
  modified: string;
  modified_by: string;
  docstatus: Docstatus;
  idx: number;
  naming_series: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  practitioner_name: string;
  full_name_arabic: string;
  gender: string;
  status: string;
  mobile_phone: string;
  practitioner_type: string;
  employee: string;
  department: string;
  user_id: string;
  default_currency: string;
  price_list: string;
  company: string;
  doctype: string;
  accounts: any[];
  practitioner_price_list: PractitionerPriceList[];
  practitioner_company: NP_Practitioner_Company[];
}

export interface PractitionerPriceList {
  name: string;
  owner: string;
  creation: string;
  modified: string;
  modified_by: string;
  docstatus: number;
  idx: number;
  price_list: string;
  "default": CheckBox;
  parent: string;
  parentfield: string;
  parenttype: string;
  doctype: string;
}

export interface NP_Practitioner_Company {
  name: string;
  owner: string;
  creation: string;
  modified: string;
  modified_by: string;
  docstatus: Docstatus;
  idx: number;
  company: string;
  parent: string;
  parentfield: string;
  parenttype: string;
  doctype: string;
}



// --------------------------------------------------
export interface NP_Nixpend_Healthcare_Settings {
  name: string;
  modified: string;
  modified_by: string;
  docstatus: Docstatus;
  idx: string;
  show_dialog_session_after_login: CheckBox;
  enable_new_born_registration: number;
  enable_auto_translation: CheckBox;
  appointment_administrator: string;
  appointment_status_permission: string;
  mobile_number_permission_in_reports: string;
  change_duration_desk_role: string;
  cancel_reschedule_appointment_permission: string;
  practitioner_event_manager: string;
  bulk_appointment_cancellation_limit: number;
  bench_manager: string;
  source: string;
  waiting_appointment: string;
  waiting_list_service_unit: string;
  patient_arrival_restriction: number;
  multi_practitioner_limit: number;
  multi_service_unit_limit: number;
  mandatory_service_unit_on_arrival: number;
  enable_multi_company: CheckBox;
  enable_multi_branch: CheckBox;
  mandatory_patient_source_in_quick_registration: number;
  show_the_patient_mobile_on_the_desk: number;
  welcome_drink: CheckBox;
  enable_patient_arrival_restriction: CheckBox;
  notify_user_for_unbilled_appointments: number;
  automatic_patient_feedback: number;
  link_with_package_subscription: string;
  link_with_payor_approval: string;
  change_appointment_type: string;
  show_expiry_approval: number;
  appointment_list_page_size: number;
  enable_ramadan_calendar: CheckBox;
  disable_general_consent_form: number;
  approval_discontinue_permission: string;
  payor_number_of_days: number;
  direct_income_invoice: number;
  allow_approval_booking_before_payment: number;
  approval_qr_code_permission: string;
  cancel_payor_payment: string;
  disable_create_item_on_insert_medication_template: number;
  for_adding_package_availed_sessions: string;
  discontinue_package_role: string;
  package_refund_item_code: string;
  number_of_days: number;
  postpone_package_role: string;
  cancel_package_payment: string;
  terminate_extend_package_role: string;
  package_discount_role: string;
  minimum_payment_allowed: number;
  prevent_services_for_uncovered_packages: number;
  adhoc_package_duration: number;
  ad_hoc_package_appointment_type: string;
  enable_adhoc_package_expiration: CheckBox;
  enable_adhoc_package_extend: CheckBox;
  enable_adhoc_package_refund: CheckBox;
  disable_sales_invoice_on_red_balance: CheckBox;
  allow_additional_fee: CheckBox;
  allow_multi_order_on_adhoc_package: CheckBox;
  allow_package_deduction: CheckBox;
  allow_cancel_package_deduction: CheckBox;
  revoke_no_show_appointment: CheckBox;
  multi_invoice_for_appointment: string;
  sales_invoice_return_permission: string;
  back_to_patient_balance_role: string;
  pos_as_default: number;
  pos_for_return: number;
  mandatory_sales_taxes_and_charges: number;
  enable_delivery_note: number;
  enable_delivery_note_in_appointment_list: number;
  prevent_sales_invoice_duplication: number;
  invoice_closure_restriction: number;
  episode_is_required: number;
  doctype: string;
  package_accounts: PackageAccount[];
  appointment_action: NP_Appointment_Action[];
  party_payment_accounts: any[];
  company_validate_price_list: any[];
  revenue_sharing_accounts: any[];
}

export interface PackageAccount {
  name: number;
  owner: string;
  creation: string;
  modified: string;
  modified_by: string;
  docstatus: Docstatus;
  idx: number;
  company: string;
  package_advance_account: string;
  vat_advance_account: string;
  parent: string;
  parentfield: string;
  parenttype: string;
  doctype: string;
}

export interface NP_Appointment_Action {
  name: string;
  owner: string;
  creation: string;
  modified: string;
  modified_by: string;
  docstatus: Docstatus;
  idx: number;
  action_on: string;
  appointment_status: string;
  value_change_field: string;
  provider_alert: CheckBox;
  api: CheckBox;
  disabled: CheckBox;
  message_content: string;
  condition: string;
  parent: string;
  parentfield: string;
  parenttype: string;
  doctype: string;
  remind_before?: string;
}

// --------------------------------- Campaign
export interface Campaign {
  name: string;
  creation: string;
  modified: string;
  modified_by: string;
  owner: string;
  docstatus: Docstatus;
  parent: any;
  parentfield: any;
  parenttype: any;
  idx: number;
  campaign_name: string;
  naming_series: string;
  description: any;
  _user_tags: any;
  _comments: any;
  _assign: any;
  _liked_by: any;
}

export interface NP_Medical_Department {
  name: string;
  creation: string;
  modified: string;
  modified_by: string;
  owner: string;
  docstatus: number;
  parent: any;
  parentfield: any;
  parenttype: any;
  idx: number;
  department: string;
  _user_tags: any;
  _comments: any;
  _assign: any;
  _liked_by: any;
  department_arabic: any;
  show_in_mobile_app: number;
  parent_medical_department: any;
  is_group: number;
  is_diagnostic_speciality: number;
  lft: number;
  rgt: number;
  old_parent: any;
  allow_in_payor_approval: number;
}

