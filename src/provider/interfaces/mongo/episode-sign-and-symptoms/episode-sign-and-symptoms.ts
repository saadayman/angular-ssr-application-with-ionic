export interface GetSignsAndSymptomsResponse {
    success: boolean;
    message: string;
    data: EpisodeSignAndSymptoms;
  }
  
  export interface EpisodeSignAndSymptoms {
    _id: string;
    json: JsonData;
    meta_data: MetaData;
  }
  
  export interface JsonData {
    additional_note: string;
    selected_sign_and_symptoms: SelectedSignAndSymptom[];
  }
  
  export interface SelectedSignAndSymptom {
    parent: string;
    other_text: string;
    children: string[];
  }
  
  export interface MetaData {
    episode_id: string;
  }
  