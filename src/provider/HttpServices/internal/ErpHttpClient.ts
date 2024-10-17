import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { NixGlobal } from "../../NixGlobal";
import { requestsService } from "../httpService.service";
import { catchError, of, tap, throwError } from "rxjs";
import { environment } from "../../../environments/environment"; 

@Injectable({ providedIn: "root" })
export class ErpHttpClient {
	constructor(
    public _HttpClient: HttpClient,
    public _NixGlobal: NixGlobal,
    public _requestsService: requestsService
	) { }

	Request_Console(Request_Type: string, JSON: any) {
		this._requestsService.Request_Console(Request_Type, JSON);
	}
	GET$<T>(DocType: string, Fields: string, Filters: any, Order_By: string, Limit_Start = 0, Limit_Page_Length = 10000, OR_Filters:string='',){
		const Request_Url = `${this._NixGlobal.API}/erp/get_doctype`;
		const params: any = {
			doctype: `${DocType}`,
			fields: Fields,
			filters: Filters,
			or_filters: OR_Filters,
			order_by: Order_By,
			limit_start: Limit_Start,
			limit_page_length: Limit_Page_Length,
		};
		return this._HttpClient.get<T>(Request_Url, { params })
	}
	GET<T>(
		DocType: string,
		Fields: string,
		Filters: any,
		Order_By: string,
		Limit_Start = 0,
		Limit_Page_Length = 10000,
		OR_Filters:string='',
	) {
		const startTime = performance.now();
		return new Promise<T>((resolve, rejects) => {
			this.Request_Console("GET", {
				DocType: DocType,
				Fields: Fields,
				Filters: Filters,
				OR_Filters: OR_Filters,
				Order_By: Order_By,
				Limit_Start: Limit_Start,
				Limit_Page_Length: Limit_Page_Length,
			});
			const Request_Url = `${this._NixGlobal.API}/erp/get_doctype`;
			const params: any = {
				doctype: `${DocType}`,
				fields: Fields,
				filters: Filters,
				or_filters: OR_Filters,
				order_by: Order_By,
				limit_start: Limit_Start,
				limit_page_length: Limit_Page_Length,
			};
			this._HttpClient.get<T>(Request_Url, { params }).subscribe(
				($$GET) => {
					const endTime = performance.now();
					this._requestsService.Check_Netowrk_Status.Add_Time(
						$$GET,
						endTime,
						startTime
					).then((Data) => {
						this._requestsService.Check_Netowrk_Status.Success(
							"GET",
							DocType,
							Data
						).then(() => {
							resolve($$GET);
						});
					});
				},
				($Error) => {
					const endTime = performance.now();
					this._requestsService.Check_Netowrk_Status.Add_Time(
						$Error,
						endTime,
						startTime
					).then((Data) => {
						this._requestsService.Check_Netowrk_Status.Error(
							"GET",
							DocType,
							Data,
							1,
							1
						).then(() => {
							rejects({ data: [], Error: $Error });
						});
					});
				}
			);
		});
	}
	DELETE(DocType: string, DocType_ID: string) {
		const startTime = performance.now();
		return new Promise((resolve, rejects) => {
			this.Request_Console("DELETE", {
				DocType: DocType,
				DocType_ID: DocType_ID,
			});
			const params = {
				doctype: DocType,
				id: DocType_ID,
			};
			this._HttpClient
				.delete(this._NixGlobal.API + "/erp/delete_doctype", { params })
				.subscribe(
					($$DELETE) => {
						const endTime = performance.now();
						this._requestsService.Check_Netowrk_Status.Add_Time(
							$$DELETE,
							endTime,
							startTime
						).then((Data) => {
							this._requestsService.Check_Netowrk_Status.Success(
								"DELETE",
								DocType,
								Data
							).then(() => {
								resolve($$DELETE);
							});
						});
					},
					($Error) => {
						const endTime = performance.now();
						this._requestsService.Check_Netowrk_Status.Add_Time(
							$Error,
							endTime,
							startTime
						).then((Data) => {
							this._requestsService.Check_Netowrk_Status.Error(
								"DELETE",
								DocType,
								Data,
								1,
								1
							).then(() => {
								rejects({ data: [], Error: $Error });
							});
						});
					}
				);
		});
	}
	POST(DocType: string, Data: any) {
		const startTime = performance.now();
		return new Promise((resolve, rejects) => {
			this.Request_Console("POST", { DocType: DocType, Data: Data });
			const POST_BODY = {
				doctype: DocType,
				fields: Data,
			};
			this._HttpClient
				.post(`${this._NixGlobal.API}/erp/post_doctype`, POST_BODY)
				.subscribe(
					($POST) => {
						const endTime = performance.now();
						this._requestsService.Check_Netowrk_Status.Add_Time(
							$POST,
							endTime,
							startTime
						).then((Data) => {
							this._requestsService.Check_Netowrk_Status.Success(
								"POST",
								DocType,
								Data
							).then(() => {
								resolve($POST);
							});
						});
					},
					($Error) => {
						const endTime = performance.now();
						this._requestsService.Check_Netowrk_Status.Add_Time(
							$Error,
							endTime,
							startTime
						).then((Data) => {
							this._requestsService.Check_Netowrk_Status.Error(
								"POST",
								DocType,
								Data,
								1,
								1
							).then(() => {
								rejects({ data: [], Error: $Error });
							});
						});
					}
				);
		});
	}
	POST$<T>(DocType: string, Data: any) {
		const POST_BODY = {
			doctype: DocType,
			fields: Data,
		}
		return this._HttpClient.post<{data: T}>(`${environment.API}/erp/post_doctype`, POST_BODY);
	}
	PUT<T>(DocType: string, DocType_ID: string, Data: Partial<T> | any ): Promise<{data: T}> {
		const startTime = performance.now();
		return new Promise((resolve, rejects) => {
			this.Request_Console("PUT", {
				DocType: DocType,
				DocType_ID: DocType_ID,
				Data: Data,
			});
			const PUT_BODY = {
				doctype: DocType,
				id: DocType_ID,
				fields: Data,
			};
			this._HttpClient
				.put<{data: T}>(`${this._NixGlobal.API}/erp/put_doctype`, PUT_BODY)
				.subscribe(
					($$PUT) => {
						const endTime = performance.now();
						this._requestsService.Check_Netowrk_Status.Add_Time(
							$$PUT,
							endTime,
							startTime
						).then((Data) => {
							this._requestsService.Check_Netowrk_Status.Success(
								"PUT",
								DocType,
								Data
							).then(() => {
								resolve($$PUT);
							});
						});
					},
					($Error) => {
						const endTime = performance.now();
						this._requestsService.Check_Netowrk_Status.Add_Time(
							$Error,
							endTime,
							startTime
						).then((Data) => {
							this._requestsService.Check_Netowrk_Status.Error(
								"PUT",
								DocType,
								Data,
								1,
								1
							).then(() => {
								rejects({ data: [], Error: $Error });
							});
						});
					}
				);
		});
	}
	GET_Child(
		DocType: string,
		Fields: string,
		Filters: string | any,
		Order_By: string,
		Child_Table: string,
		Limit_Start = 0,
		Limit_Page_Length = 100
	) {
		const startTime = performance.now();
		return new Promise((resolve, rejects) => {
			this.Request_Console("GET_Child", {
				DocType: DocType,
				Child_Table: Child_Table,
				Fields: Fields,
				Filters: Filters,
				Order_By: Order_By,
				Limit_Start: Limit_Start,
				Limit_Page_Length: Limit_Page_Length,
			});
			// this._NixStorage.get('authorization').then(($Authorization: any) => {

			const url = `${this._NixGlobal.API}/erp/child_table`;
			const params: any = {
				doctype: DocType,
				filters: `[${Filters}]`,
				filter_child: Child_Table,
				start: 0,
				limit: 100,
			};
			this._HttpClient.get(url, { params }).subscribe(
				($$GET) => {
					const endTime = performance.now();
					this._requestsService.Check_Netowrk_Status.Add_Time(
						$$GET,
						endTime,
						startTime
					).then(($Data) => {
						this._requestsService.Check_Netowrk_Status.Success(
							"GET_Child",
							DocType,
							$Data
						).then(() => {
							resolve($$GET);
						});
					});
				},
				($Error) => {
					const endTime = performance.now();
					this._requestsService.Check_Netowrk_Status.Add_Time(
						$Error,
						endTime,
						startTime
					).then(($Data) => {
						this._requestsService.Check_Netowrk_Status.Error(
							"GET_Child",
							DocType,
							$Data,
							1,
							1
						).then(() => {
							rejects({ data: [], Error: $Error });
						});
					});
				}
			);
		});
		// });
	}
	POST_Notification(
		Patient_ID: string,
		Appointment_ID: string,
		Appointment_Date,
		Appointment_Time,
		Healthcare_Practitioner_Name: string,
		Healthcare_Practitioner_Name_Arabic: string
	) {
		const startTime = performance.now();
		return new Promise((resolve, rejects) => {
			const POST_Body = {
				pid: Patient_ID,
				appointment_id: Appointment_ID,
				appointment_date: Appointment_Date,
				appointment_time: Appointment_Time,
				practitioner_name: Healthcare_Practitioner_Name,
				healthcare_practitioner_name_arabic:
          Healthcare_Practitioner_Name_Arabic,
			};
			this._HttpClient
				.post(`${this._NixGlobal.API}/erp/notification_submit`, POST_Body)
				.subscribe(
					($POST) => {
						const endTime = performance.now();
						this._requestsService.Check_Netowrk_Status.Add_Time(
							$POST,
							endTime,
							startTime
						).then(($Data) => {
							this._requestsService.Check_Netowrk_Status.Success(
								"POST",
								"Patient Notification Mobile",
								$Data
							).then(() => {
								resolve($POST);
							});
						});
					},
					($Error) => {
						const endTime = performance.now();
						this._requestsService.Check_Netowrk_Status.Add_Time(
							$Error,
							endTime,
							startTime
						).then(($Data) => {
							this._requestsService.Check_Netowrk_Status.Error(
								"POST",
								"Patient Notification Mobile",
								$Data,
								1,
								0
							).then(() => {
								rejects({ data: [], Error: $Error });
							});
						});
					}
				);
		});
	}
	POST_FILE(DocType: string, Data: any) {
		const startTime = performance.now();
		return new Promise((resolve, rejects) => {
			this.Request_Console("POST", { DocType: DocType, Data: Data });
			this._HttpClient
				.post(`${this._NixGlobal.API}/erp/post_file`, Data)
				.subscribe(
					($POST) => {
						const endTime = performance.now();
						this._requestsService.Check_Netowrk_Status.Add_Time(
							$POST,
							endTime,
							startTime
						).then((Data) => {
							this._requestsService.Check_Netowrk_Status.Success(
								"POST",
								DocType,
								Data
							).then(() => {
								resolve($POST);
							});
						});
					},
					($Error) => {
						const endTime = performance.now();
						this._requestsService.Check_Netowrk_Status.Add_Time(
							$Error,
							endTime,
							startTime
						).then((Data) => {
							this._requestsService.Check_Netowrk_Status.Error(
								"POST",
								DocType,
								Data,
								1,
								1
							).then(() => {
								rejects({ data: [], Error: $Error });
							});
						});
					}
				);
		});
	}

	GET_Sales_Invoice(
		doc: string,
		name: string,
		print_format: string,
		no_letterhead: number,
		letterhead: string,

	) {
		const startTime = performance.now();
		return new Promise((resolve, rejects) => {
			// this.Request_Console("GET", {
			//   DocType: DocType,
			//   Fields: Fields,
			//   Filters: Filters,
			//   Order_By: Order_By,
			//   Limit_Start: Limit_Start,
			//   Limit_Page_Length: Limit_Page_Length,
			// });
			const Request_Url = `${this._NixGlobal.API}/erp/get_sales_invoice`;
			const params: any = {
				doc,
				name,
				print_format,
				no_letterhead,
				letterhead,
			};
			this._HttpClient.get(Request_Url, { params }).subscribe(
				($$GET) => {
					const endTime = performance.now();
					this._requestsService.Check_Netowrk_Status.Add_Time(
						$$GET,
						endTime,
						startTime
					).then((Data) => {
						this._requestsService.Check_Netowrk_Status.Success(
							"GET",
							doc,
							Data
						).then(() => {
							resolve($$GET);
						});
					});
				},
				($Error) => {
					const endTime = performance.now();
					this._requestsService.Check_Netowrk_Status.Add_Time(
						$Error,
						endTime,
						startTime
					).then((Data) => {
						this._requestsService.Check_Netowrk_Status.Error(
							"GET",
							doc,
							Data,
							1,
							1
						).then(() => {
							rejects({ data: [], Error: $Error });
						});
					});
				}
			);
		});
	}
	S3_Generate_file(src: string) {
		const startTime = performance.now();
		return new Promise((resolve, rejects) => {
			const Request_Url = `${this._NixGlobal.API}/erp/s3_generate_file`;
			const params: any = {src};
			this._HttpClient.get(Request_Url, { params ,responseType: 'blob'}).subscribe(
				($$GET) => {
					const objectURL = URL.createObjectURL($$GET);
					console.log(objectURL);
					resolve(objectURL)
				},
				($Error) => {
					const endTime = performance.now();
					this._requestsService.Check_Netowrk_Status.Add_Time(
						$Error,
						endTime,
						startTime
					).then((Data) => {
						this._requestsService.Check_Netowrk_Status.Error(
							"GET",
							"QR Code",
							Data,
							1,
							1
						).then(() => {
							rejects({ data: [], Error: $Error });
						});
					});
				}
			);
		});
	}

	GET_Patient_Balance(
		patient_id: string
	) {
		const startTime = performance.now();
		return new Promise((resolve, rejects) => {
			const Request_Url = `${this._NixGlobal.API}/erp/patient_balance`;
			const params: any = {
				patient_id
			};
			this._HttpClient.get(Request_Url, { params }).subscribe(
				($$GET) => {
					const endTime = performance.now();
					this._requestsService.Check_Netowrk_Status.Add_Time(
						$$GET,
						endTime,
						startTime
					).then((Data) => {
						this._requestsService.Check_Netowrk_Status.Success(
							"GET",
							"Patient Balance",
							Data
						).then(() => {
							resolve($$GET);
						});
					});
				},
				($Error) => {
					const endTime = performance.now();
					this._requestsService.Check_Netowrk_Status.Add_Time(
						$Error,
						endTime,
						startTime
					).then((Data) => {
						this._requestsService.Check_Netowrk_Status.Error(
							"GET",
							"Patient Balance",
							Data,
							1,
							1
						).then(() => {
							rejects({ data: [], Error: $Error });
						});
					});
				}
			);
		});
	}

	GET_availability_stock(
		item_code: string,warehouse:string
	) {
		const startTime = performance.now();
		return new Promise((resolve, rejects) => {
			const Request_Url = `${this._NixGlobal.API}/erp/get_availability_stock`;
			const params: any = {
				item_code,warehouse
			};
			this._HttpClient.get(Request_Url, { params }).subscribe(
				($$GET) => {
					const endTime = performance.now();
					this._requestsService.Check_Netowrk_Status.Add_Time(
						$$GET,
						endTime,
						startTime
					).then((Data) => {
						this._requestsService.Check_Netowrk_Status.Success(
							"GET",
							"Availability Stock",
							Data
						).then(() => {
							resolve($$GET);
						});
					});
				},
				($Error) => {
					const endTime = performance.now();
					this._requestsService.Check_Netowrk_Status.Add_Time(
						$Error,
						endTime,
						startTime
					).then((Data) => {
						this._requestsService.Check_Netowrk_Status.Error(
							"GET",
							"Availability Stock",
							Data,
							1,
							1
						).then(() => {
							rejects({ data: [], Error: $Error });
						});
					});
				}
			);
		});
	}

}

