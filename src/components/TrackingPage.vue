<template>
  <div class="mainDiv">
    <h2 class="mainDiv__title">IP Address Tracker</h2>

      <!-- Search Input  -->
      <form @submit.prevent="submitSearchReq">
        <div class="d-flex row justify-content-center align-items-center">
          <div class="col-lg-6 col-md-6 col-8">
            <div class="input-group">
              <input type="text" class="form-control" placeholder="Search for any IP address or domain"
                v-maska="bindedObject" @input="validateIP"
                data-maska="['###.###.###.###', '###.###.#.##','#.#.#.#','###.###.#.#','##.##.###.###','###.##.###.###']" />
              <!-- data-maska="###.###.###.###" -->
              <button class="btn mainDiv__submit bg-darkGray" type="submit">
                <img src="../assets/icon-arrow.svg" />
              </button>
            </div>
            <div class="invalid-feedback d-inline-block h5" v-if="bindedObject.completed && error">
              Please Enter a Valid Email
            </div>
          </div>
          <div class="col-lg-10 col-md-10 col-sm-10 col-8 d-flex flex-wrap bg-white mt-4 py-3 px-4 rounded-4 z-1">
            <div class="col-lg-3 col-md-3 col-sm-3 col-12 d-flex justify-content-between"
              v-for="(item, index) of cardsData" :key="index">
              <card-item :title="item.title" :data="item.data" />
              <div class="mySeparator mx-2 d-md-block d-none">
                <div class="mySeparator__elem" v-if="!(index == cardsData.length - 1)"></div>
              </div>
            </div>
          </div>
          <div id="mapContainer" class="col-12 position-absolute z-0">
          </div>
        </div>
      </form>

      <!-- IP Info  -->
  </div>
</template>
<script>

import { vMaska } from "maska";
import axios from 'axios'

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import cardItem from './cardItem.vue';

export default {
  components: { cardItem },
  directives: { maska: vMaska },
  mounted() {
    this.setupLeafletMap();
  },

  data() {
    return {
      window: window,
      mapDiv: null,
      marker: null,
      bindedObject: {
        masked: "",
        unmasked: "",
        completed: false,
      },
      center: [37.38605, -122.08385],
      cardsData: [{ title: "IP Address", data: "---" }, { title: "Location", data: "---" }, { title: "Timezone", data: "---" }, { title: "ISP", data: "---" },],
      error: false,
    };
  },
  methods: {
    validateIP() {
      const ipAddressRegex =
        /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
      if (this.bindedObject.completed) {
        if (ipAddressRegex.test(this.bindedObject.masked)) {
          this.error = false;
        } else {
          this.error = true;
        }
      }
    },
    async submitSearchReq() {
      if (this.error) return;
      else {
        this.$loader.show();
        try {
          const res = await axios.get(`https://geo.ipify.org/api/v2/country,city?apiKey=at_kt7sibH3GrMCPmXh8tcxRiz7xahfN&ipAddress=${this.bindedObject.masked}`);
          if (res.status == 200) {
            const data = res.data;
            this.center[0] = data.location.lat;
            this.center[1] = data.location.lng;
            this.cardsData[0].data = data.ip;
            this.cardsData[1].data = `${data.location.region}, ${data.location.country} <br class="d-none d-md-block"/> ${data.location.postalCode}`;
            this.cardsData[2].data = `UTC ${data.location.timezone}`;
            this.cardsData[3].data = data.isp;
            this.updateMap();
          } else {
            console.log(res);
          }
          this.$loader.hide();

        } catch (err) {
          this.$loader.hide();

          return err;
        }
      }
    },
    setupLeafletMap: function () {
      const accessToken = 'pk.eyJ1IjoiYW1pcm1tb25pciIsImEiOiJjbGl3dm1hOGMwMjA0M2RvOTZkZjN5enRlIn0.b4oMKYQI95fqn6Kt_ZIDLA';
      this.mapDiv = L.map("mapContainer").setView(this.center, 13);
      L.tileLayer(
        `https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${accessToken}`,
        {
          attribution:
            'Map data (c) <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          id: "mapbox/streets-v11",
          accessToken,
        }
      ).addTo(this.mapDiv);
      this.marker = L.marker(this.center).addTo(this.mapDiv);
    },
    updateMap() {
      // this.mapDiv.setView(this.center, 13);
      this.mapDiv.flyTo(this.center, 13);
      this.marker.setLatLng(this.center);
    }
  },
};
</script>
