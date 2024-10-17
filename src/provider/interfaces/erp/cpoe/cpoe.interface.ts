import { Docstatus } from "../common.types";

export type ERP_DEFAULT_ORDER_TYPE = 'Procedure Orders' | 'Medication Orders' | 'Lab Orders' | 'Radiology Orders' | 'Package Orders' | 'Appointment Orders';
export type Discount_Type = 'Campaign' | 'Practitioner';
export type Discount_Unit_Type = 'Discount Percentage' | 'Discount Amount';


export interface ServicesDetail {
    name: string;
    owner: string;
    creation: string;
    modified: string;
    modified_by: string;
    docstatus: Docstatus;
    idx: number;
    company: string;
    medical_department: string;
    price_list: string;
    op_consulting_charge_item: string;
    parent: string;
    parentfield: string;
    parenttype: string;
    doctype: string;
}
