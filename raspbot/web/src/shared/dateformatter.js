export default {
	install: (Vue) => {

		Vue.prototype.$dateFormatter = {

			normMonths: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
			abbrMonths: ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"],

			unixtimeToString: function (timestamp, abbreviateMonths) {
				const date = new Date(timestamp);

				const formattedDate = this.styleDate(date, abbreviateMonths);
		    const hour = this.styleComponent(date.getHours());
		    const minute = this.styleComponent(date.getMinutes());

				return formattedDate + " " + hour + ":" + minute;
			},
			/**
		   * Styles the date.
		   *
		   * @param  {Date} 	date 	The date.
		   * @return {String} 			The date styled.
		   */
			styleDate: function (date, abbreviateMonths) {
				const year 	= date.getFullYear();
				const month = (abbreviateMonths) ? this.abbrMonths[date.getMonth()] : this.normMonths[date.getMonth()];
				const day		= this.styleComponent(date.getDate());

				if (abbreviateMonths) {

				}

		    return day + ' ' + month + ' ' + year;
			},
			/**
		   * Styles a date component (integer). Adds a leading zero, if missing.
		   *
		   * @param  {Int} component The date component.
		   * @return {String}        The date component styled.
		   */
		  styleComponent: function (component) {
		    if (component < 10) {
		      return "0" + component;
		    }

		    return component;
		  }
		}

	}
};
