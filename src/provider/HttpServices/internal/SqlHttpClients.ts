import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NixGlobal } from '../../NixGlobal';
import { NIX_STORAGE } from '../../tools/NIX_STORAGE';
import { requestsService } from '../httpService.service';
import { NP_Patient_Appointment } from '../../interfaces'; 


@Injectable({ providedIn: 'root' })

export class SqlHttpClient {
	constructor(
    private _HttpClient: HttpClient,
    private _NixStorage: NIX_STORAGE,
    private _NixGlobal: NixGlobal,
    public _requestsService: requestsService
	) { }

	get_campaign(Filters) {
		var startTime = performance.now()
		return new Promise((resolve, rejects) => {

			this._requestsService.Request_Console('get_campaign', { 'Filters': Filters })
			this._NixStorage.get("location").then(($Location: any) => {
				const POST_BODY = {
					db: $Location.db,
					filters: Filters,
					nestTables: true,
				}
				this._HttpClient.post(`${this._NixGlobal.API}/sql/get_campaign`, POST_BODY)
					.subscribe({
						next: ($POST) => {
							console.log($POST);

							var endTime = performance.now()
							this._requestsService.Check_Netowrk_Status.Success("GET", 'Campaign', Object.assign({ data: $POST }, { time: ((endTime - startTime) / 1000).toFixed(2) + ' seconds' })).then(() => {
								resolve($POST)
							})
						},
						error: ($Error) => {
							var endTime = performance.now()
							this._requestsService.Check_Netowrk_Status.Error("GET", 'Campaign', Object.assign($Error, { time: ((endTime - startTime) / 1000).toFixed(2) + ' seconds' }), 1, 1).then(() => {
								rejects({ data: [], "Error": $Error });
							})
						},
						complete: () => {
							console.log("*****************COMPLETE***********************");

						}
					})
			});
		});
	}
	get_template_prices(DocType, Filters, Order_By, Limit_Start = 0, Limit_Page_Length = 10000) {
		var startTime = performance.now()
		return new Promise((resolve, rejects) => {

			this._requestsService.Request_Console('get_template_prices', { 'DocType': DocType, 'Filters': Filters, 'Order_By': Order_By, 'Limit_Start': Limit_Start, 'Limit_Page_Length': Limit_Page_Length })
			this._NixStorage.get("location").then(($Location: any) => {
				const POST_BODY = {
					db: $Location.db,
					doctype: DocType,
					filters: Filters,
					nestTables: true,
					order_by: Order_By,
					limit_start: Limit_Start,
					limit_page_length: Limit_Page_Length,
				}
				this._HttpClient.post(`${this._NixGlobal.API}/sql/get_template_prices`, POST_BODY)
					.subscribe({
						next: ($POST) => {
							console.log($POST);

							var endTime = performance.now()
							this._requestsService.Check_Netowrk_Status.Success("GET", DocType, Object.assign({ data: $POST }, { time: ((endTime - startTime) / 1000).toFixed(2) + ' seconds' })).then(() => {
								resolve($POST)
							})
						},
						error: ($Error) => {
							var endTime = performance.now()
							this._requestsService.Check_Netowrk_Status.Error("GET", DocType, Object.assign($Error, { time: ((endTime - startTime) / 1000).toFixed(2) + ' seconds' }), 1, 1).then(() => {
								rejects({ data: [], "Error": $Error });
							})
						},
						complete: () => {
							console.log("*****************COMPLETE***********************");
						}
					})
			});
		});

	}
	get_service_assignment(BODY, Limit_Start = 0, Limit_Page_Length = 10000) {
		var startTime = performance.now()
		return new Promise((resolve, rejects) => {

			this._requestsService.Request_Console('get_service_assignment', { 'DocType': 'Patient Service Assignment', 'Filters': BODY, 'Limit_Start': Limit_Start, 'Limit_Page_Length': Limit_Page_Length })
			this._NixStorage.get("location").then(($Location: any) => {
				const POST_BODY = {
					db: $Location.db,
					patient: BODY.patient,
					nestTables: true,
					limit_start: Limit_Start,
					limit_page_length: Limit_Page_Length,
				}
				this._HttpClient.post(`${this._NixGlobal.API}/sql/get_service_assignment`, POST_BODY)
					.subscribe({
						next: ($POST) => {
							console.log($POST);

							var endTime = performance.now()
							this._requestsService.Check_Netowrk_Status.Success("GET", 'Patient Service Assignment', Object.assign({ data: $POST }, { time: ((endTime - startTime) / 1000).toFixed(2) + ' seconds' })).then(() => {
								resolve($POST)
							})
						},
						error: ($Error) => {
							var endTime = performance.now()
							this._requestsService.Check_Netowrk_Status.Error("GET", 'Patient Service Assignment', Object.assign($Error, { time: ((endTime - startTime) / 1000).toFixed(2) + ' seconds' }), 1, 1).then(() => {
								rejects({ data: [], "Error": $Error });
							})
						},
						complete: () => {
							console.log("*****************COMPLETE***********************");
						}
					})
			});
		});

	}
	get_template_sdmm(Limit_Start = 0, Limit_Page_Length = 10000) {
		var startTime = performance.now()
		return new Promise((resolve, rejects) => {

			this._requestsService.Request_Console('get_template_sdmm', { 'DocType': 'SDMM Template', 'Limit_Start': Limit_Start, 'Limit_Page_Length': Limit_Page_Length })
			this._NixStorage.get("location").then(($Location: any) => {
				const POST_BODY = {
					db: $Location.db,
					nestTables: true,
					limit_start: Limit_Start,
					limit_page_length: Limit_Page_Length,
				}
				this._HttpClient.post(`${this._NixGlobal.API}/sql/get_template_sdmm`, POST_BODY)
					.subscribe({
						next: ($POST) => {
							console.log($POST);

							var endTime = performance.now()
							this._requestsService.Check_Netowrk_Status.Success("GET", 'SDMM Template', Object.assign({ data: $POST }, { time: ((endTime - startTime) / 1000).toFixed(2) + ' seconds' })).then(() => {
								resolve($POST)
							})
						},
						error: ($Error) => {
							var endTime = performance.now()
							this._requestsService.Check_Netowrk_Status.Error("GET", 'SDMM Template', Object.assign($Error, { time: ((endTime - startTime) / 1000).toFixed(2) + ' seconds' }), 1, 1).then(() => {
								rejects({ data: [], "Error": $Error });
							})
						},
						complete: () => {
							console.log("*****************COMPLETE***********************");
						}
					})
			});
		});

	}
	GET_BOOKED_PACKAGES($encounter, $patient?) {
		var startTime = performance.now()
		return new Promise((resolve, rejects) => {
			this._requestsService.Request_Console('booked_packages', {
				body: {
					$encounter,
					$patient
				}
			})
			let url = `${this._NixGlobal.API}/sql/get_booked_packages`
			let POST_BODY = {
				"nestTables": true,
				"encounter": $encounter,
				"patient": $patient,
			}
			this._HttpClient.post(url, POST_BODY)
				.subscribe($$GET => {
					var endTime = performance.now()
					this._requestsService.Check_Netowrk_Status.Add_Time($$GET, endTime, startTime).then(($Data) => {
						this._requestsService.Check_Netowrk_Status.Success("GET_BOOKED_PACKAGES", $encounter || $patient, $Data).then(() => {
							resolve($$GET)
						})
					})
				}, $Error => {
					var endTime = performance.now()
					this._requestsService.Check_Netowrk_Status.Add_Time($Error, endTime, startTime).then(($Data) => {
						this._requestsService.Check_Netowrk_Status.Error("GET_BOOKED_PACKAGES", $encounter || $patient, $Data, 1, 1).then(() => {
							rejects({ data: [], "Error": $Error });
						})
					})
				});
		});

	}

	GetAppointment(appointment_name: string) {
		return new Promise((resolve, reject) => {
			this._requestsService.Request_Console('GetAppointment', { appointment_name:appointment_name })

			this._HttpClient.post(`${this._NixGlobal.API}/sql/get_appointment`,
				{appointment_name:appointment_name
				}).subscribe((appointment: any) => {
				resolve(appointment)
			},$error=>{
				reject($error)
			})
		})
	}
	get_child_sql<T>(parent_doctype, parent_filters, child): Promise<T> {
		var startTime = performance.now()
		return new Promise((resolve, rejects) => {
			this._requestsService.Request_Console('Get Child', { 'Filters': parent_filters, 'DocType': parent_doctype })
			this._NixStorage.get("location").then(($Location: any) => {
				const POST_BODY = {
					parent_doctype: parent_doctype,
					parent_filters: parent_filters,
					child: child,
					db: $Location.db,
					nestTables: true,
					limit_start: 0,
					limit_page_length: 1000,
				}
				this._HttpClient.post<T>(`${this._NixGlobal.API}/sql/get_child`, POST_BODY)
					.subscribe({
						next: ($POST) => {
							console.log($POST);

							var endTime = performance.now()
							this._requestsService.Check_Netowrk_Status.Success("GET_Child", parent_doctype, Object.assign({ data: $POST }, { time: ((endTime - startTime) / 1000).toFixed(2) + ' seconds' })).then(() => {
								resolve($POST)
							})
						},
						error: ($Error) => {
							var endTime = performance.now()
							this._requestsService.Check_Netowrk_Status.Error("GET_Child", parent_doctype, Object.assign($Error, { time: ((endTime - startTime) / 1000).toFixed(2) + ' seconds' }), 1, 1).then(() => {
								rejects({ data: [], "Error": $Error });
							})
						},
						complete: () => {
							console.log("*****************COMPLETE***********************");

						}
					})
			});
		})
	}
	get_child_with_filter_sql(parent_doctype, parent_filters, child) {
		var startTime = performance.now()
		return new Promise((resolve, rejects) => {
			this._requestsService.Request_Console('Get Child', { 'Filters': parent_filters, 'DocType': parent_doctype })
			this._NixStorage.get("location").then(($Location: any) => {
				const POST_BODY = {
					parent_doctype: parent_doctype,
					parent_filters: parent_filters,
					child: child,
					db: $Location.db,
					nestTables: true,
					limit_start: 0,
					limit_page_length: 1000,
				}
				this._HttpClient.post(`${this._NixGlobal.API}/sql/get_child_with_filter`, POST_BODY)
					.subscribe({
						next: ($POST) => {
							console.log($POST);

							var endTime = performance.now()
							this._requestsService.Check_Netowrk_Status.Success("GET_Child", parent_doctype, Object.assign({ data: $POST }, { time: ((endTime - startTime) / 1000).toFixed(2) + ' seconds' })).then(() => {
								resolve($POST)
							})
						},
						error: ($Error) => {
							var endTime = performance.now()
							this._requestsService.Check_Netowrk_Status.Error("GET_Child", parent_doctype, Object.assign($Error, { time: ((endTime - startTime) / 1000).toFixed(2) + ' seconds' }), 1, 1).then(() => {
								rejects({ data: [], "Error": $Error });
							})
						},
						complete: () => {
							console.log("*****************COMPLETE***********************");

						}
					})
			});
		})
	}

	// not needed
	// Get_Procedures(Data) {
	// 	return new Promise((resolve, rejects) => {
	// 		this._requestsService.Request_Console('Get_Procedures', { Data })
	// 		const POST_BODY = Data
	// 		this._HttpClient.post(`${this._NixGlobal.API}/sql/get_procedures`, POST_BODY)
	// 			.subscribe($POST => {
	// 				resolve($POST)
	// 			}, $Error => {
	// 				rejects({ data: [], "Error": $Error });
	// 			});
	// 	});
	// }
	get_appointment_related_orders(appointment: NP_Patient_Appointment) {
		return new Promise((resolve, reject) => {

			this._HttpClient.post(`${this._NixGlobal.API}/sql/get_appointment_related_orders`, appointment).subscribe((appointment_related_orders) => {
				resolve(appointment_related_orders)
			}, $error => {
				reject($error)
				console.log($error)
			})
		})
	}

	get_users(DocType, Filters, Order_By, Limit_Start = 0, Limit_Page_Length = 10000) {
		var startTime = performance.now()
		return new Promise((resolve, rejects) => {

			this._requestsService.Request_Console('get_users', { 'DocType': DocType, 'Filters': Filters, 'Order_By': Order_By })
			this._NixStorage.get("location").then(($Location: any) => {
				const POST_BODY = {
					db: $Location.db,
					doctype: 'User',
					filters: Filters,
					nestTables: false,
					order_by: Order_By,
					limit_start: Limit_Start,
					limit_page_length: Limit_Page_Length,
				}
				this._HttpClient.post(`${this._NixGlobal.API}/sql/get_users`, POST_BODY)
					.subscribe({
						next: ($POST) => {
							console.log($POST);

							var endTime = performance.now()
							this._requestsService.Check_Netowrk_Status.Success("GET", DocType, Object.assign({ data: $POST }, { time: ((endTime - startTime) / 1000).toFixed(2) + ' seconds' })).then(() => {
								resolve($POST)
							})
						},
						error: ($Error) => {
							var endTime = performance.now()
							this._requestsService.Check_Netowrk_Status.Error("GET", DocType, Object.assign($Error, { time: ((endTime - startTime) / 1000).toFixed(2) + ' seconds' }), 1, 1).then(() => {
								rejects({ data: [], "Error": $Error });
							})
						},
						complete: () => {
							console.log("*****************COMPLETE***********************");
						}
					})
			});
		});

	}
}