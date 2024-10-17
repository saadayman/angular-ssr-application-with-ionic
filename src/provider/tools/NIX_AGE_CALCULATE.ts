import { Injectable } from "@angular/core";
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class NIX_AGE_CALCULATE {
  constructor() { }
  calculate(date_of_birth, gender?) {
    const YEARS = moment().diff(date_of_birth, 'years');
    return {
      age: YEARS > 0 ? YEARS : '< 1',
      age_string: this.age_string(date_of_birth),
      precise_calculate: this.precise_calculate(date_of_birth),
      gender_avatar: gender ? this.gender_image(date_of_birth, gender) : ""
    }
  }
  private age_string(date_of_birth) {
    const PRECISE_AGE = this.precise_calculate(date_of_birth);
    return `${PRECISE_AGE.years} Year(s) ${PRECISE_AGE.months} Month(s) ${PRECISE_AGE.days} Day(s)`
  }
  private precise_calculate(date_of_birth) {
    const YEARS = moment().diff(date_of_birth, 'years');
    const DB_PLUS_YEARS = moment(date_of_birth).add(YEARS, 'years');
    const MONTHS = moment().diff(DB_PLUS_YEARS, 'months');
    const DB_PLUS_YEARS_PLUS_MONTHS = moment(DB_PLUS_YEARS).add(MONTHS, 'months');
    const DAYS = moment().diff(DB_PLUS_YEARS_PLUS_MONTHS, 'days');

    if (Number.isNaN(YEARS) || Number.isNaN(MONTHS) || Number.isNaN(DAYS)) {
      return { years: null, months: null, days: null }
    } else {
      return { years: YEARS, months: MONTHS, days: DAYS };
    }
  }
  private gender_image(age, gender) {
    const PATH = "../../../assets/Images/icon"
    const GENDER = gender.toLowerCase()
    const AGE = this.calculate(age).age;
    if (gender === null || age === null) {
      return "../../../assets/Images/icon_avatar.svg"
    }
    if (AGE as number >= 51) {
      return `${PATH}_${GENDER}_old.svg`
    }
    if (AGE as number <= 50 && AGE as number >= 16) {
      return `${PATH}_${GENDER}_youth.svg`
    }
    if (AGE as number <= 15 && AGE as number >= 5) {
      return `${PATH}_${GENDER}_kids.svg`
    }
    if (AGE as number < 5 || AGE === '< 1') {
      return `${PATH}_${GENDER}_baby.svg`
    }
  }
}
