import { CheckBox, Docstatus } from "../../common.types";

export type product_control = 'Controlled' | 'Uncontrolled' | null;

export interface NP_Medication_Template {
    name: string;
    creation: string;
    modified: string;
    modified_by: string;
    owner: string;
    docstatus: Docstatus;
    idx: number;
    item_code: string;
    item: string;
    alert: CheckBox;
    template_name: string;
    register_number: any;
    scientific_name: string;
    item_group: string;
    item_division: string;
    package_types: string;
    dose_form: any;
    route: any;
    valuation_method: string;
    shelf_life_in_days: number;
    is_billable: CheckBox;
    has_batch_no: CheckBox;
    has_expiry_date: CheckBox;
    has_serial_no: CheckBox;
    disabled: CheckBox;
    allow_booking: CheckBox;
    allow_direct_deduction: CheckBox;
    description: any;
    product_type: string;
    legal_status: string;
    distribute_area: string;
    product_control: product_control;
    drug_type: string;
    sub_type: string;
    strength: any;
    package_size: number;
    strength_unit: any;
    medical_code_standard: any;
    medical_code: any;
    medical_code_description: any;
    _user_tags: any;
    _comments: any;
    _assign: any;
    _liked_by: any;
}

export interface NP_Patient_Medication {
    name: string;
    owner: string;
    creation: string;
    modified: string;
    modified_by: string;
    docstatus: Docstatus;
    idx: number;
    naming_series: string;
    patient: string;
    patient_name: string;
    full_name_in_arabic: string;
    nid_or_iqama_id: string;
    nationality: string;
    date_of_birth: string;
    gender: string;
    mobile: string;
    blood_group: string;
    date_of_joining: string;
    country: string;
    alert: number;
    template_name: string;
    medication_name: string;
    scientific_name: string;
    package_types: string;
    dosage: string;
    dose_form: string;
    route: string;
    comment: string;
    period: string;
    dosage_quantity: number;
    requester: string;
    requester_name: string;
    medical_department: string;
    reference_doctype: string;
    reference_name: string;
    reference_date: string;
    reference_time: string;
    branch: string;
    company: string;
    ordered_at: string;
    ordered_on: string;
    order_date: string;
    order_time: string;
    order_status: string;
    revoke_reason: string;
    order_intent: string;
    order_priority: string;
    consent_form_created: number;
    related_appointment: string;
    price_list: string;
    billing_item: string;
    quantity: number;
    title: string;
    order_valid_to: string;
    np_patient_episode: string;
    np_package_subscription: string;
    np_patient_payor_approval: string;
    campaign: string;
    discount_type: string;
    given_discount: number;
    invoiced_quantity: number;
    is_billable: CheckBox;
    is_invoiced: CheckBox;
    request_deduction: CheckBox;
    package_item_id: string;
    doctype: string;
    transaction_references: any[];
    pos_transaction_reference: any[];
    medication_order_type: string;
}