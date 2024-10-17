export interface EncounterComments {
    meta_data: {
      appointment_id: string;
      encounter_id: string;
      creation: {
        created_by_name?: string;
        created_by_id?: string;
        created_time?: Date;
      };
      modified: {
        modified_by_name?: string;
        modified_by_id?: string;
        modified_time?: Date;
      };
    };
    json: {
        comment_type: string;
        content: string;
        reference_doctype: string;
        reference_name: string;
        user_type: string;
    };
}