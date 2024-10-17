import { CheckBox, Docstatus } from "../../common.types";
import { Item__discount_based_on, Item__healthcare_service } from "../np-package-subscription";

export interface NP_Package {
    name: string;
    owner: string;
    creation: string;
    modified: string;
    modified_by: string;
    docstatus: Docstatus;
    idx: number;
    naming_series: string;
    is_active: CheckBox;
    company: string;
    package_name: string;
    description: string;
    package_advance: string;
    advance_vat_account: string;
    complex_package: CheckBox;
    is_refundable: CheckBox;
    indirect_income_account: string;
    has_expiry_date: CheckBox;
    duration: number;
    doctype: string;
    np_package_summary: NpPackageSummary[];
    np_package_services: NpPackageService[];
    _liked_by: string;
}

export interface NpPackageSummary {
    name: string;
    creation: string;
    modified: string;
    modified_by: string;
    docstatus: Docstatus;
    idx: number;
    price_list: string;
    package_price_before_discount: number;
    package_price_after_discount: number;
    parent: string;
    parentfield: string;
    parenttype: string;
    doctype: string;
}

export interface NpPackageService {
    name: string;
    owner: string;
    creation: string;
    modified: string;
    modified_by: string;
    docstatus: Docstatus;
    idx: number;
    department: string;
    price_list: string;
    discount_based_on: Item__discount_based_on;
    discount: number;
    session_rate: number;
    healthcare_service: Item__healthcare_service;
    healthcare_service_template: string;
    item_code: string;
    item_name: string;
    quantity: number;
    service_amount_before_discount: number;
    service_amount_after_discount: number;
    parent: string;
    parentfield: string;
    parenttype: string;
    doctype: string;
}