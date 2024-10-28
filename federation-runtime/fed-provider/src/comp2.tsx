import { embedDashboard } from "@superset-ui/embedded-sdk";
import axios from 'axios';
import React from "react";
import rison from "rison";

const supersetUrl = 'http://localhost:8088'
const supersetApiUrl = supersetUrl + '/api/v1/security'
const dashboardId = "48de75e1-4100-425e-8cca-0bb24842b04e" // replace with your dashboard id

function toJsonFilter(filter:any) {
    return {
        "extraFormData": {
                "filters": [
                    {
                        "col": filter.name,
                        "op": "IN",
                        "val": [
                            filter.value
                        ]
                    }
                ]
            },
            "filterState": {
                "label": filter.value,
                "validateStatus": false,
                "value": [
                    filter.value,
                ]
            },
            "id": 'NATIVE_FILTER-' + filter.id,
            "ownState": {}
        }
}

type FilterObject = {[key: string] : any}

function toJsonFilters(filters:Array<any>) {
    var filterObjects: FilterObject = {}
    filters.forEach (filter => {
        filterObjects['NATIVE_FILTER-' + filter.id] = toJsonFilter(filter)
    })
    return filterObjects
}

function toRison(filters:Array<any>) {
    let filterObjects = toJsonFilters(filters)
    return rison.encode(filterObjects)
}

async function initDashboard() {

    // This uses admin creds to fetch the token
    const login_body = {
        "password": "admin",
        "provider": "db",
        "refresh": true,
        "username": "admin"
    };
    const login_headers = {
        "headers": {
        "Content-Type": "application/json"
        }
    }

    const { data } = await axios.post(supersetApiUrl + '/login', login_body, login_headers)
    const access_token = data['access_token']
    console.log(access_token)

    const guest_token_body = JSON.stringify({
        "resources": [
          {
            "type": "dashboard",
            "id": dashboardId,
          }
        ],
        "rls": [],
        "user": {
          "username": "",
          "first_name": "",
          "last_name": "",
        }
      });
    const guest_token_headers = {
        "headers": {
          "Content-Type": "application/json",
          "Authorization": 'Bearer ' + access_token
        }
      }

    // Calling guest token endpoint to get the guest_token
  await axios.post(supersetApiUrl + '/guest_token/', guest_token_body, guest_token_headers).then(dt => {
    console.log(dt.data['token'])
    embedDashboard({
      id: dashboardId,  // Use the id obtained from enabling embedding dashboard option
      supersetDomain: supersetUrl,
      mountPoint: document.getElementById("superset-container")!, // html element in which iframe will be mounted to show the dashboard
      fetchGuestToken: () => dt.data['token'],
      dashboardUiConfig: { 
        hideTitle: true,
        filters: {
            visible: false,
            expanded: false,
        },
        urlParams: {
            native_filters: toRison([{
                id: 'skV1lHxFf7t4IQMoVmp0Q',
                name: 'year',
                value: '2003'
            },{
                id: 'jZqKK2Z76uMvWMmfpOPBk',
                name: 'month',
                value: '12'
            }])
        }
      },
      iframeSandboxExtras: ['allow-top-navigation', 'allow-popups-to-escape-sandbox']
    });
    var iframe = document.querySelector("iframe")
    if (iframe) {
        iframe.style.width = '1200px'; // Set the width of the iframe
        iframe.style.minHeight = '600px'; // Set the height of the iframe
    }

  })

};

export default function Comp2(props:any) {
    React.useEffect(
        () => { initDashboard () }, 
        props
    );
    return (
        <div style={{color:props.color, fontSize: props.fontSize}}>
            <div id='superset-container'></div>
        </div>
    )
}