export interface WorkflowItem {
    name: string;
    creation: string;
    modified: string;
    modified_by: string;
    owner: string;
    docstatus: number;
    idx: number;
    modal_name: string;
    mandatory: number;
    version: string;
    notify: number;
    parent: string;
    parentfield: string;
    parenttype: string;
    status?:string
  }
  
  export interface SelectedWorkflows {
    selected: {
      modal_work_flow: WorkflowItem[];
    };
  }