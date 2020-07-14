import React from "react";
import "./index.css";

import {
  Inject,
  ScheduleComponent,
  Month,
  ViewsDirective,
  ViewDirective,
  // EventSettingsModel,
} from "@syncfusion/ej2-react-schedule";

import {
  DataManager,
  WebApiAdaptor,
} from "@syncfusion/ej2-data";

function Scheduler() {
  let localData = {
    dataSource: [{
      Id: 1,
      StartTime: new Date(2020, 5, 6, 4, 0),
      EndTime: new Date(2020, 5, 6, 6, 0),
      Summary: 'Weekend',
      IsBlock: true,
      IsAllDay: true,
      IsReadonly: true,
      RecurrenceRule: 'FREQ=WEEKLY;INTERVAL=1;COUNT=500'
    }]
  }

  let remoteData = new DataManager({
    url: 'https://js.syncfusion.com/demos/ejservices/api/schedule/loaddata',
    adaptor: new WebApiAdaptor(),
    crossDomain: true
  })

  return (
    <>
      <ScheduleComponent currentView="Month" eventSettings={localData}>
        <ViewsDirective>
          <ViewDirective option="Month" isSelected={true} />
        </ViewsDirective>
        <Inject services={[Month]} />
      </ScheduleComponent>
    </>
  );
}

export default Scheduler;
