import { Injectable } from '@angular/core'

import mergeImages from 'merge-images-v2'
import Painterro from 'painterro'
import { ClipboardPage } from 'src/app/modal/clipboard/clipboard.page'
import { Insurance_Approval_Component } from 'src/app/modal/Insurance_Approval/Insurance_Approval'
import { MedicalCodePage } from "src/app/modal/Medical_Code/Medical_Code"
import { NetworkErrorPage } from 'src/app/modal/network-error/network-error.page'
import { Pain_Summary_Component } from 'src/app/modal/Pain_Assessment/Pain_Summary/Pain_Summary'
import { PatientSearchPage } from 'src/app/modal/Patient Search/Patient_Search'
import { Patient_Journey_Component } from 'src/app/modal/Patient_Journey/Patient_Journey'
import { PreviewFormPage } from 'src/app/modal/previewform/previewform.page'
import { SearchComponent } from 'src/app/modal/Search/Search'
import { NixDoctypeJSON } from './NixDoctypeJSON'
import { NixGlobal } from './NixGlobal'
import { ModalController } from '@ionic/angular/standalone'



@Injectable({
	providedIn: 'root'
})
export class NixModal {
	// modal
	constructor(
    public _Modalcontroller: ModalController,
    public _NixGlobal: NixGlobal,
    private _NixDoctypeJSON: NixDoctypeJSON
	) { }
	Add_JSON($root, value) {
		if (value) {
			this._NixDoctypeJSON[$root.split(".")[0]][$root.split(".")[1]][$root.split(".")[2]][$root.split(".")[3]] = value
			this.CONSOLE.add(this._NixDoctypeJSON[$root.split(".")[0]].Doctype.replace(/ /g, "_") + "." + $root.split(".")[2] + "." + $root.split(".")[3], this._NixDoctypeJSON[$root.split(".")[0]][$root.split(".")[1]][$root.split(".")[2]])
		}
		if (!value) {
			delete this._NixDoctypeJSON[$root.split(".")[0]][$root.split(".")[1]][$root.split(".")[2]][$root.split(".")[3]]
			this.CONSOLE.delete(this._NixDoctypeJSON[$root.split(".")[0]].Doctype.replace(/ /g, "_") + "." + $root.split(".")[2] + "." + $root.split(".")[3], this._NixDoctypeJSON[$root.split(".")[0]][$root.split(".")[1]][$root.split(".")[2]])
		}
	}
	CONSOLE = {
		"add": function ($root_text, $data) {
			console.log("%cAdd " + "%c" + $root_text, "color:#00CC00 ; font-style: bold;", "color:#FFC300 ; font-style: bold;", $data)
		},
		"delete": function ($root_text, $data) {
			console.log("%cDelete " + "%c" + $root_text, "color:#FF0F00 ; font-style: bold;", "color:#FFC300 ; font-style: bold;", $data)
		}
	}
	// =+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=

	/**
  * options = {
  *   clone_json: true || false,
  *   backdropDismiss: true || false,
  *   cssClass
  */

	// tempfun need refactore
	init_modal($component_select, $send_json_to_component, $options?, Label?: any) {
		return new Promise((resolve, reject) => {
			let jsonData = $send_json_to_component
			if ($options?.clone_json == true && $options?.clone_json !== undefined) {
				jsonData = JSON.parse(JSON.stringify($send_json_to_component))
			}

			let data = {}
			data[Label] = jsonData
			const modalPage = this.Switch($component_select)

			this._Modalcontroller.create({
				component: modalPage,
				componentProps: data,
				cssClass: $options?.cssClass !== undefined ? $options.cssClass : 'CSS_Modal',
				backdropDismiss: $options?.backdropDismiss !== undefined ? $options.backdropDismiss : false,
			}).then((modal) => {
				resolve(modal)
			})
		})
	}



	async Modalcontroller($component_select, $send_json_to_component, $options?, Label?: any) {
		let jsonData = $send_json_to_component
		if ($options?.clone_json == true && $options?.clone_json !== undefined) {
			jsonData = JSON.parse(JSON.stringify($send_json_to_component))
		}
		let data = {}
		data[Label] = jsonData
		const Modalcontroller = await this._Modalcontroller.create({
			component: $component_select,
			componentProps: data,
			cssClass: $options?.cssClass !== undefined ? $options.cssClass : 'CSS_Modal',
			backdropDismiss: $options?.backdropDismiss !== undefined ? $options.backdropDismiss : false,
		})
		await Modalcontroller.present()
		this._NixGlobal.Modal_References.push(Modalcontroller)
		console.log("modals", this._NixGlobal.Modal_References);

		return Modalcontroller.onDidDismiss()
			.then(($D) => {
				this._NixGlobal.Modal_References.pop() 

				return $D;
			})
	}
	Paint(Image_Root, Image_Source) {
		var observer = this
		var Image_Data = 'this._NixDoctypeJSON.' + Image_Root
		var Image_Url: any
		var Is_File_Attached = false
		if (eval(Image_Data)) {
			Image_Url = eval(Image_Data)
		} else {
			Image_Url = Image_Source
		}
		Painterro({
			activeColor: '#254E82',
			backplateImgUrl: Image_Url,
			hiddenTools: ['zoomin', 'zoomout', 'resize'],
			hideByEsc: true,
			saveByEnter: true,
			saveHandler: function (image, done) {
				var Base64_Data = image.asDataURL()
				if (Is_File_Attached) {
					observer.Add_JSON(Image_Root, Base64_Data)
					done(true)
				} else {
					observer.Merge_Images(Image_Root, Base64_Data, Image_Url)
					done(true)
				}
			},
			onImageLoaded: function () {
				console.log('image is loaded')
				Is_File_Attached = true
			}
		}).show()
	}
	Merge_Images(Image_Root, data, Image_Source) {
		mergeImages([Image_Source, data])
			.then((b64) => {
				this.Add_JSON(Image_Root, b64)
			});
	}

	openModal(name, JSON = {}, options = {}, Label = "JSON") {
		return new Promise((resolve, reject) => {

			const modalPage = this.Switch(name)
			this._Modalcontroller
			this.Modalcontroller(modalPage, JSON, options, Label).then(data => {

				resolve(data)
			});
		})
	}

	newOpenModal(componentClass: any, data: any, options?: {cssClass?: string, backdropDismiss?: boolean, id?: string}){
		return this._Modalcontroller.create({
			component: componentClass,
			componentProps: data,
			cssClass: options?.cssClass !== undefined ? options.cssClass : 'CSS_Modal',
			backdropDismiss: options?.backdropDismiss !== undefined ? options?.backdropDismiss : false,
			id: options?.id
		})
	}

Switch(modal){
const modalMap = {
  'NetworkError':NetworkErrorPage,
  'Patient_Journey':Patient_Journey_Component,
  'Insurance_Approval':Insurance_Approval_Component,
  'Search':SearchComponent,
  'PatientSearch':PatientSearchPage,
  'PreviewForm':PreviewFormPage,
  'Pain_Summary':Pain_Summary_Component,
  'MedicalCodePage':MedicalCodePage,
  'Clipboard': ClipboardPage
}
return modalMap[modal]
}

}