import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class ReportTemplate {
  constructor() { }
  Template($template, $separate, $array) {
    var flag = false
    var item = ""
    $array.forEach(element => {
      if (element) {
        flag = true
        item = item + element + $separate
      }
    });
    if (flag) {
      if ($template) {
        return "<span style='font-weight: bold;'>" + $template + '</span> <br>' + item + '<br>' + '<br>'
      }
      else {
        return ''
      }
    }
    else {
      return ""
    }
  }
  Template_Title($template, $separate, $array) {
    var item = ""
    $array.forEach(element => {
      if (element) {

        item = item + element + $separate
      }
    });
    if ($template) {
      return "<span style='font-weight: 800;'>" + $template + '</span> <br>' + item + '<br>'
    }
    else {
      return ''
    }
  }
  Template_Static($template, $separate, $array) {
    var flag = false
    var Template = $template
    $array.forEach(element => {
      if (element) {
        flag = true
        Template = Template + $separate + element
      }
    });
    if (flag) {
      return Template
    }
    else {
      return ""
    }
  }
  Family_History($title,$template,$separate, $array) {
    var item1 = ""
    var item2 = ""
    $array.forEach(($element, $index, $$array) => {
      if ($element == "1") {
        if ($index != "0") {
          item1 = item1 + $$array[$index - 1] + $separate
        }
        else {
          item1 = item1 + $$array[$index] + $separate
        }
      }
    });

     $array.forEach(($element, $index, $$array) => {
        if ($element == "2") {
         if($index != "0") 
         {
           item2 = item2 + $$array[$index-1] + $separate
         }
         else 
         {
           item2 = item2 + $$array[$index] + $separate
         } 
       }
     });

    if ($title) {
      return   $title + '<br><br>'  + $template[0] + '<br>' + item1 + '<br>'  + $template[1] + '<br>' + item2 + '<br>'
    }
    else {
      return ''
    }
  }
  Assessment($template,$separate, $array) {
    var item1 = ""
    var item2 = ""
    $array.forEach(($element, $index, $$array) => {
      if ($element == "Principal") {
        if ($index != "0") {
          item1 = item1 + $$array[$index - 1] + $separate
        }
        else {
          item1 = item1 + $$array[$index] + $separate
        }
      }
    });

     $array.forEach(($element, $index, $$array) => {
        if ($element == "Secondary") {
         if($index != "0") 
         {
           item2 = item2 + $$array[$index-1] + $separate
         }
         else 
         {
           item2 = item2 + $$array[$index] + $separate
         } 
       }
     });

    if ($template) {
      return "<span style='font-weight: 800;'>" + 'ICD-10 Diagnosis' + '</span> <br> <br>' + "<span style='font-weight: bold;'>" + $template[0] + '</span> <br>' + item1 + '<br>' +  "<span style='font-weight: bold;'>" + $template[1] + '</span> <br>' + item2 + '<br>'
    }
    else {
      return ''
    }
  }
  CheckValue(x) {
    if (x) {
      return x + ", "
    } else {
      return ""
    }
  }
  CheckValueWithoutComma(x) {
    if (x) {
      return x + " "
    } else {
      return ""
    }
  }
  CheckValueWithoutComma1(x) {
    if (x) {
      return x + " "
    } else {
      return "Not Tested"
    }
  }
  CheckValue_SetBold(x) {
    if (x) {
      return '<strong>'+ x + '</strong><br><br>'
    } else {
      return " "
    }
  }
  CheckValue_Set_Bold_Without_break(x) {
    if (x) {
      return '<strong>'+ x + '</strong>'
    } else {
      return ;
    }
  }
  CheckNotNull_SetBold(x) {
    if (x!==null) {
      return '<strong>'+ x + '</strong> '
    } else {
      return " "
    }
  }
 
  CheckValueWitDot(x) {
    if (x) {
      return x + "."
    } else {
      return ""
    }
  }
  CheckValuex(x, y) {
    if ( x=='') {
      return y
    }
    else if(x)
    {
      return y
    }
     else {
      return ''
    }
  }
  CheckValuex1(x, y) {
    if (x) {
      return y
    }
     else {
      return ''
    }
  }
 
  CheckValueNotNull(x, y){
    if(x===null){
      return ''
    }else
    {return y}
  }
  CheckValueWord(x, y) {
    if (x) {
      return y + x;
    } else {
      return ''
    }
  }
  CheckValueOrder(x, y) {
    if (x) {
      return x + y;
    } else {
      return ''
    }
  }
  Child_Style(x,$CssStyle) {
    if (x) {
      return "<span style='"+$CssStyle+"'>"+ x +"</span>";
    } else {
      return ''
    }
  }
  CheckValueWordAfter(x, y) {
    if (x=='') {
      return x + y;
    }
    else if(x)
    {
      return x + y;
    }
     else {
      return " "
    }
  }
  CheckValueDate(x) {
    if (x) {
      return x;
    } else {
      return ''
    }
  }

  
  Template_Static_Bold($template, $array) {
    var flag = false
    var Template = $template
    $array.forEach(element => {
      if (element) {
        flag = true
      }
    });
    if (flag) {
      return "<b>"+Template+"</b>"
    }
    else {
      return ""
    }
  }
  PrintImg(x){
    if(x == null || x == '' || x== undefined){
      
      return ''
    }
    else {
      return "<img style='width: 10%;height: 10%;' src=" +x+ " />"
    }
  }
  Question(x,y,$separate,$other='',$otherQ='',$other2='',$otherQ2='',$other3='',$otherQ3='',$other4='',$otherQ4=''){
    let returned;
    if(x!='' && x!= null )
    {returned= '<strong>'+ y + ' </strong> '+ x 
    if($other!=''){
      returned= returned +'<strong>'+ $otherQ + ' </strong> '+$other
    }
    if($other2!=''){
      returned= returned +'<strong>'+ $otherQ2 + ' </strong> '+$other2
    }
    if($other3!=''){
      returned= returned +'<strong>'+ $otherQ3 + ' </strong> '+$other3
    }
    if($other4!=''){
      returned= returned +'<strong>'+ $otherQ4 + ' </strong> '+$other4
    }
    return returned +$separate
  }
    else {
      return returned= ''
    }
      }
  Compair(x,y,$output){
    if (x==y)
    {return $output}
    else{return ''}
  }
      Template_Static_WithoutSpace($template, $separate, $array) {
        var flag = false
        var Template = $template
        $array.forEach(element => {
          if (element) {
            flag = true
            Template = Template + $separate + element
          }
          else{
            Template = Template
          }
        });
        if (flag) {
          return Template +"<br><br>"
        }
        else {
          return ""
        }
      }
      CheckValueWithUnit(x, y, Unit) {
        if (x=='') {
          return y + x + Unit;
        }
        else if(x)
        {
          return y + x + Unit;
        }
         else {
          return " "
        }
      }
      CompairWithAray(x,y,$arrayCh,$Array,$template,$separate){
        let $output=''
        if (x==y)
       { $output= $output + $template
         $arrayCh.forEach((element, Index) => {
          if(element)
          {$output = $output + $Array[Index]+$separate}

        else{$output = $output}})
        return $output
        }
        else{return ' '}
      }
      FutComment($x,$y,$z) {
        if ($x) {
          if($y){
            if($z){return "<p><b>Comment: </b>" +$z +"</p>"}
            else {return ''}
          }else {return ''}
        }else {return "" }
      }
      FutChoice(x, y, z) {
        if(x){
          if(y == '' || y == null){
            return ' '
          }
          else return y + z;
        }else return ''
      }
      CheckValueWithoutComment(x) {
        if (x==0){
          return 0
        }
        if (x) {
          return x 
        } else {
          return ""
        }
      }
      CheckValueWithoutCommaZero(x) {
        if (x || x==0) {
          return x + " "
        } else {
          return ""
        }
      }
    

      Template_Static_With_Element($template, $separate, $array) {
        var flag = false
        var Template = $template
        $array.forEach(element => {
          if (element) {
            flag = true
            Template = Template + element + $separate
          }
        });
        if (flag) {
          return Template
        }
        else {
          return ""
        }
      
      }
      History_of_hair_treatment($template, $array) {
        var flag = false
        var txt = ''
        var Template = $template
        $array.forEach(element => {
          if (element) {
            flag = true
            txt = txt + element + ', '
          }
        });
        if (flag) {
          return "<b>"+Template+" </b>" + "<p>" + txt + "</p>"
        }
        else {
          return ""
        }
      }
      Level($firstValue,$maxValue){
        if($firstValue != undefined){
          return `${$firstValue} out of ${$maxValue}` 
        }
        else return ''
      }
      // ---------------------------------------->> [New Report Functions]
      // print title and array of Field
      Tempalate_Line($template,$Seperate_template, $data, $seperate, $CSS_template='',$end='', $CSS_data = ''){
        var flag = false;
        var txt = ''
        var Template =`<span style='${$CSS_template}' >` + $template + `</span>${$Seperate_template}`
        $data.forEach(element => {
          if (element) {
            flag = true
            txt = txt + `<span style='${$CSS_data}' >` + element + `</span>` + $seperate
            
          }
        });
        if (flag) {
          return Template + txt.substr(0,txt.lastIndexOf($seperate)).toString() + $end
        }
        else {
          return ""
        }
      }

      checkBox_With_Fields($main='', $main_Title='', $main_Comment='', $CSS_main='', $separate='', $FieldA='', $FieldA_title='', $CSS_FieldA_title='',
       $FieldA_seperate='', $FieldA_comment='', $CSS_FieldA_comment='', $end='' ){
        let txt = '';
        if($main){
          txt += `<span style="${$CSS_main}">` + $main_Title + `</span>` + $separate + $main + $main_Comment
        }
        if($FieldA){
          txt += `<span style="${$CSS_FieldA_title}">` + $FieldA_title + `</span>`  + $FieldA_seperate + $FieldA + `<span style="${$CSS_FieldA_comment}">` + $FieldA_comment + `</span>` 
        }
        return txt + $end
      }

      Question1(x,y,$separate,$other='',$otherQ='',$other2='',$otherQ2='',$other3='',$otherQ3='',$other4='',$otherQ4=''){
        let returned;
        if(x!='' && x!= null )
        {returned= '<strong>'+ y + ' </strong> '+ x 
        if($other!=''){
          returned= returned +'<strong>'+ $otherQ + ' </strong> '+$other
        }
        if($other2!=''){
          returned= returned +'<strong>'+ $otherQ2 + ' </strong> '+$other2
        }
        if($other3!=''){
          returned= returned +'<strong>'+ $otherQ3 + ' </strong> '+$other3
        }
        if($other4!=''){
          returned= returned +'<strong>'+ $otherQ4 + ' </strong> '+$other4
        }
        return returned +$separate
      }
        else {
          return returned= ''
        }
    }

    copyPrintImg(x){
      if(x == 'null' || x == ''){
        return ''
      }
      else {
        return "<img style='width: 10%;height: 10%;' src=" +x+ " />"
      }
    }
    Tempalate_Line_zeroes($template,$Seperate_template, $data, $seperate, $CSS_template='',$end=''){
      var flag = false;
      var txt = ''
      var Template =`<span style='${$CSS_template}' >` + $template + `</span>${$Seperate_template}`
      $data.forEach(element => {
        if (element || element==0) {
          flag = true
          txt = txt + element + $seperate
        }
      });
      if (flag) {
        return Template + txt.substr(0,txt.lastIndexOf($seperate)).toString() + $end
      }
      else {
        return ""
      }
    }


    Tab($tabName, $content){
      // console.log('$tabName: ', $tabName.toString().trim().replace(/ /g,'').replace( /(<([^>]+)>)/ig, ''))
      // console.log('$content: ', $content.toString().trim().replace(/ /g,'').replace( /(<([^>]+)>)/ig, ''))
      if ($tabName.toString().trim().replace(/ /g,'').replace( /(<([^>]+)>)/ig, '') == $content.toString().trim().replace(/ /g,'').replace( /(<([^>]+)>)/ig, '')){
        return ""
      }
      else{
        return $tabName
      }
    }
  

}