export interface ClinicalProcedureOrder {
    _id: string;
    meta_data: {
      name: string;
      np_documentation_summary: string;
      patient_id: string;
      appointment_id: string;
      encounter_id: string;
      episode_id?: string;
      version?: string;
      template_id: string;
      template_name: string;
      category: string;
      template_category: string;
      creation: {
        created_by_name?: string;
        created_by_id?: string;
        created_time?: string;
      };
      modified: {
        modified_by_name?: string;
        modified_by_id?: string;
        modified_time?: string;
      };
      submitted: {
        submitted_by_name?: string;
        submitted_by_id?: string;
        submitted_time?: string;
      };
      doc_status: number;
    };
    json: {
      requested_practitioner: string;
      requester: string;
      medical_department?: string;
      requested_department?: string;
      requester_name?: string;
      reference_doctype?: string;
      reference_name?: string;
      reference_date?: string;
      reference_time?: string;
      order_reference_type?: string;
      order_reference_name?: string;
      order_reference_date?: string;
      order_reference_time?: string;
      branch?: string;
      company?: string;
      ordered_on?: string;
      ordered_at?: string;
      order_valid_to?: string;
      order_date?: string;
      order_time?: string;
      order_status?: string;
      order_intent?: string;
      order_priority?: string;
      np_patient_episode?: string;
      price_list?: string;
      quantity?: string;
      campaign?: string;
      discount_type?: string;
      given_discount?: string;
      discountAmount?: string;
      is_billable?: string;
      billing_item?: string;
      item_code?: string;
      item_group?: string;
      is_verbal_order?: string;
      record_order?: string;
      playback_order?: string;
      validate_order?: string;
      comment?: string;
      rate?: number;
      price_list_rate?: number;
      alert: number;
      is_referral: number;
      service_unit?: string;
    };
    createdAt: Date;
    updatedAt: Date;
  }
  