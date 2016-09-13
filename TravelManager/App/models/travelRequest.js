// create namespace for this project
var trm = trm || {};
trm.models = trm.models || {};

// travel request entity
trm.models.travelRequest = function () {
    this.Id = undefined;
    this.Title = undefined;
    this.AccomodationCosts = undefined;
    this.TravelCosts = undefined;
    this.MiscCosts = undefined;
    this.MealCosts = undefined;
    this.DepartureDate = undefined;
    this.ArrivalDate = undefined;
    this.__metadata = {
        type: 'SP.Data.TravelRequestsListItem'
    };
};