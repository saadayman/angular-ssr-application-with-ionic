import { Sales_Taxes_and_Charges } from "../../accounting";
import { CheckBox, Docstatus } from "../../common.types";

export interface NP_Package_Subscription {
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
    "package": string;
    adhoc_package: CheckBox;
    package_name: string;
    description: string;
    is_refundable: CheckBox;
    allocate_patient_credit_balance: number;
    patient_credit_balance: number;
    allocated_amount: number;
    refunded: number;
    refundable_amount: number;
    has_expiry_date: number;
    duration: number;
    from_date: string;
    to_date: string;
    package_extended: CheckBox;
    company: string;
    campaign: string;
    currency: string;
    customer: string;
    status: string;
    package_basic_price: number;
    discount_amount: number;
    default_discount_amount: number;
    package_price_after_discount: number;
    patient_gained_discount: number;
    total_package_price: number;
    paid_amount: number;
    outstanding_amount: number;
    availed_amount: number;
    remaining_amount: number;
    overall_vat_amount: number;
    collected_advance_vat: number;
    consumed_vat_amount: number;
    remaining_vat_amount: number;
    price_list: string;
    taxes_and_charges: string;
    total_quantity: number;
    total_consumed_quantity: number;
    patient_credit_balance_payment: string;
    package_advance: string;
    doctype: string;
    taxes: Sales_Taxes_and_Charges[];
    items: NP_Package_Item[];
    package_payment_reference: NP_Nixpend_Package_Payment_Reference[];
}

export interface NP_Package_Item {
    assigned_practitioner: string;
    assigned_practitioner_name: string;
    consumed_amount: number;
    consumed_quantity: number;
    creation: string;
    department: string;
    discontinued: CheckBox;
    discount_based_on: Item__discount_based_on;
    discount: number;
    docstatus: Docstatus;
    doctype: string;
    healthcare_service_template: string;
    healthcare_service: Item__healthcare_service;
    idx: number;
    initial_completed_session: number;
    item_code: string;
    item_deduction_quantity: number;
    item_name: string;
    modified_by: string;
    modified: string;
    name: string;
    owner: string;
    parent: string;
    parentfield: string;
    parenttype: string;
    price_list: string;
    quantity: number;
    remaining_amount: number;
    remaining_quantity: number;
    request_deduction: CheckBox;
    service_amount_after_discount: number;
    service_amount_before_discount: number;
    session_rate: number;
    reference_doctype: string;
    reference_name: string;
}

export interface NP_Nixpend_Package_Payment_Reference {
    name: string;
    owner: string;
    creation: string;
    modified: string;
    modified_by: string;
    docstatus: Docstatus;
    idx: number;
    posted_date: string;
    package_payment_reference: string;
    paid_amount: number;
    allocated_from_patient_balance: CheckBox;
    jv_status: string;
    payment_owner: string;
    parent: string;
    parentfield: string;
    parenttype: string;
    doctype: string;
}

export type Item__discount_based_on = 'Percentage' | 'Amount';
export type Item__healthcare_service = 'NP Appointment Type' | 'NP Clinical Procedure Template' | 'NP Lab Test Template' | 'NP Medication Template' | 'NP Radiology Template' | '';
