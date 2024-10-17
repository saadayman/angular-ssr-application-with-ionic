import { Injectable } from "@angular/core";
import { NIX_ALERT } from "../tools/NIX_ALERT";
import { NIX_LOADING } from "../tools/NIX_LOADING";
import { Router } from "@angular/router";
import { NIX_STORAGE } from "../tools/NIX_STORAGE";

@Injectable({ providedIn: "root" })
export class requestsService {
  constructor(
    public _NIX_ALERT: NIX_ALERT,
    public _NixStorage: NIX_STORAGE,

    public _NIX_LOADING: NIX_LOADING,
  ) {}
  Check_Netowrk_Status = {
    Success: (Title, Doctype, JSON) => {
      return new Promise((resolve) => {
        this._NIX_ALERT.Network_Error(false);
        this._NIX_ALERT.Success(`HTTP_${Title}_Doctype ${Doctype}`, JSON, 1, 0);
        resolve(true);
      });
    },
    Error: (Title, Doctype, Error, Console, Toast) => {
      return new Promise((resolve) => {
        if (Error.status === 0 || Error.status === 504) {
          this._NIX_ALERT.Network_Error(true);
          this._NIX_LOADING.dismiss();
          resolve(true);
        } else {
          this._NIX_ALERT.Error(
            `HTTP_${Title} ${Doctype} [Error Status]=${Error.status}`,
            Error,
            Console,
            Toast
          );
          this._NIX_LOADING.dismiss();
          resolve(true);
        }
      });
    },
    Add_Time: (Data, endTime, startTime) => {
      return new Promise((resolve) => {
        resolve(
          Object.assign(JSON.parse(JSON.stringify(Data)), {
            time: ((endTime - startTime) / 1000).toFixed(2) + " seconds",
          })
        );
      });
    },
  };
  Request_Console(Request_Type, _JSON?) {
    const logData = (header, value) => {

      console.log(`%c${header} : %c${value}`, "color: #FFC300", "color:#fded76");
    };
  
    switch (Request_Type) {
      case "GET":
        logData("GET_Doctype", _JSON?.DocType);
        logData("Fields", _JSON?.Fields);
        logData("Filters", JSON.stringify(_JSON?.Filters));
        logData("Order_by", _JSON?.Order_By);
        logData("Limit_Start", _JSON?.Limit_Start);
        logData("Limit_Page_Length", _JSON?.Limit_Page_Length);
        break;
  
      case "POST":
        logData("POST_Doctype", _JSON?.DocType);
        logData("Data", JSON.stringify(_JSON?.Data));
        break;
  
      case "PUT":
        logData("PUT_Doctype", _JSON?.DocType);
        logData("Doctype_ID", _JSON?.DocType_ID);
        logData("Data", JSON.stringify(_JSON?.Data));
        break;
  
      case "DELETE":
        logData("DELETE_Doctype", _JSON?.DocType);
        logData("Doctype_ID", _JSON?.DocType_ID);
        break;
  
      case "Generate_Documentation":
        logData("Type", _JSON?.DocType);
        logData("Data", JSON.stringify(_JSON?.Visit_Body));
        break;
  
      case "generate_extra_order":
        logData("Type", _JSON?.DocType);
        logData("Data", JSON.stringify(_JSON?.Visit_Body));
        break;
  
      case "Documentation_Wizard":
        logData("Mongo_ID", _JSON?.Mongo_ID);
        logData("Clinical_Procedure", _JSON?.Clinical_Procedure);
        break;
  
      case "PUT_FORM":
        logData("PUT_Form", _JSON?.Form_name);
        logData("Data", JSON.stringify(_JSON?.Data));
        logData("Save To Encounter", _JSON?.Save_To_Encounter);
        logData("Selected", _JSON?.Selected);
        break;
  
      case "PUT_COMPLEX_FORM":
        logData("PUT_COMPLEX_FORM", _JSON?.Form_name);
        logData("Data", JSON.stringify(_JSON?.Data));
        logData("Complex_Form_Data", _JSON?.Complex_Form_Data);
        logData("Save To Encounter", _JSON?.Save_To_Encounter);
        logData("Selected", _JSON?.Selected);
        break;
      
      case "SIGN_OFF" :
            logData("Mongo_ID",_JSON?.Mongo_ID);
            logData(`Data`,JSON.stringify(_JSON?.Data));
        break;
      case "POST_MONGO":
     logData('Collection' ,_JSON?.Collection);
    logData(`Data`,JSON.stringify(_JSON?.Data));
        break;
      case "PUT_MONGO" :
        logData(`Collection`,_JSON?.Collection);
        logData("Mongo_ID",_JSON?.Mongo_ID);
        logData(`Data`,JSON.stringify(_JSON?.Data));
        break;
      case "GET_MONGO" :
        logData(`Collection`,_JSON?.Collection);
        logData("Mongo_ID",_JSON?.Mongo_ID);
      logData(`Filters`,JSON.stringify(_JSON?.Filters),);
      logData(`Sort`,_JSON?.Sort);
        break;
      case "DELETE_MONGO" :
        logData(`Collection`,_JSON?.Collection);
        logData("Mongo_ID",_JSON?.Mongo_ID);
      logData(`Filters`,JSON.stringify(_JSON?.Filters),);
      logData(`Sort`,_JSON?.Sort);
        break;
      case "Get Sites" :
        logData('Collection' ,_JSON?.Collection);
        logData(`Data`,JSON.stringify(_JSON?.data));
        break;
      case "Login" :
      case "Check Token" :
      case "Forgot password" :
       console.log(
                `%cRequest Type : %c${Request_Type}`,
                "color: #FFC300",
                "color:#fded76"
              );
        break;
      case "GET_Summary" :
        logData(`RequestType`,_JSON?.Collection);
        logData(`Data`,JSON.stringify(_JSON));
        break;

        case "Get Child":
        logData("Get_Doctype", _JSON?.DocType);
        logData("Filters", JSON.stringify(_JSON?.Filters));
        break;

        case "Relese Note":
          logData(`Collection`,_JSON?.Collection);
        logData(`Filters`,JSON.stringify(_JSON?.Filters),);
        break;

      case "PUT_MULTI_DOCUMENT_MONGO" :
  
  logData(`Collection`,_JSON?.Collection);
  logData(`Data`,JSON.stringify(_JSON?.Data));
        break;
      case "get_template_prices" :
        logData("GET_Doctype", _JSON?.DocType);
        logData("Filters", JSON.stringify(_JSON?.Filters));
        logData("Order_by", _JSON?.Order_By);
        logData("Limit_Start", _JSON?.Limit_Start);
        logData("Limit_Page_Length", _JSON?.Limit_Page_Length);
        break;
        case "get_campaign":
          logData("GET_Doctype", 'Get_campaign');
          logData("Filters", JSON.stringify(_JSON?.Filters));
        break;
        case "booked_packages":
          logData("GET_Doctype", 'Booked Packages');
          logData("Filters", JSON.stringify(_JSON?.body));
          break;
        case "GetAppointments":
          logData("Get Appointments",'')
          logData('doctype: ',_JSON?.payload.doctype);
          logData('appointment_date: ',_JSON?.payload.appointment_date);
          logData('practitioner: ',_JSON?.payload.practitioner);
          logData('company: ',_JSON?.payload.company);
          logData('service_unit: ',_JSON?.payload.service_unit);
          logData('offset: ',_JSON?.payload.offset);
          logData('limit: ',_JSON?.payload.limit);
          break;
        case "Get_Procedures":
          logData("Get Procedures",JSON.stringify(_JSON?.Data))
          break;
      default:
        break;
    }
  }

}
