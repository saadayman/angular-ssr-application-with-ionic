import { CheckBox, Docstatus } from "../../common.types";

export interface NP_Appointment_Type {
    name: string;
    owner: string;
    creation: string;
    modified: string;
    modified_by: string;
    docstatus: Docstatus;
    idx: number;
    appointment_type: string;
    appointment_type_arabic: string;
    default_duration: number;
    color: string;
    is_active: CheckBox;
    is_billable: CheckBox;
    ip: CheckBox;
    is_insurance: CheckBox;
    allow_multiple_items: CheckBox;
    order_is_required: CheckBox;
    allow_booking: CheckBox;
    allow_patient_rating: CheckBox;
    allow_direct_deduction: CheckBox;
    allow_patient_multiple_appointments: CheckBox;
    allow_sign_off_practitioner: CheckBox;
    allow_sign_off_nurse: CheckBox;
    allow_telemedicine: CheckBox;
    allow_direct_orders: CheckBox;
    at_home: CheckBox;
    patient_kiosk: CheckBox;
    allow_free_visit: CheckBox;
    allow_workflow: CheckBox;
    doctype: string;
    items: Item[];
    appointment_workflow_table: any[];
}

// label: Appointment Type Service Items
export interface Item {
    name: string;
    owner: string;
    creation: string;
    modified: string;
    modified_by: string;
    docstatus: Docstatus;
    idx: number;
    medical_department: string;
    document_type?: string;
    op_consulting_charge_item: string;
    company: string;
    op_consulting_charge: number;
    inpatient_visit_charge: number;
    price_list: string;
    parent: string;
    parentfield: string;
    parenttype: string;
    doctype: string;
}

export interface NP_Requested_Appointment {
    name: string;
    owner: string;
    creation: string;
    modified: string;
    modified_by: string;
    docstatus: Docstatus;
    idx: number;
    naming_series: string;
    title: string;
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
    template_name: string;
    date_of_appointment: string;
    requested_practitioner: string;
    practitioner_name: string;
    requested_department: string;
    requester: string;
    requester_name: string;
    medical_department: string;
    reference_doctype: string;
    reference_name: string;
    reference_date: string;
    reference_time: string;
    company: string;
    order_date: string;
    order_valid_to: string;
    order_time: string;
    order_status: string;
    revoke_reason: string;
    order_intent: string;
    order_priority: string;
    comment: string;
    np_patient_episode: string;
    np_package_subscription: string;
    np_patient_appointment: string;
    np_patient_payor_approval: string;
    np_clinical_procedure: string;
    np_clinical_procedure_template: string;
    np_package_item_code: string;
    campaign: string;
    service_unit: string;
    given_discount: number;
    quantity: number;
    discount_type: string;
    doctype: string;
}