<template>
  <v-row justify="center" align="center">
    <v-col cols="12">
      <v-card>
        <v-card-title>
          <v-row class="my-3">
            <v-col cols="8">
              <v-text-field
                v-model="searchByTeam"
                append-icon="mdi-magnify"
                label="Search by team"
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-btn class="my-3" @click="listPlayersByTeam()">Search</v-btn>
            </v-col>
          </v-row>
          <v-row class="my-3">
            <v-col cols="8">
              <v-text-field
                v-model="searchByPlayer"
                append-icon="mdi-magnify"
                label="Search player"
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-btn class="my-3" @click="listPlayers()">Search</v-btn>
            </v-col>
          </v-row>
          <v-row class="my-3">
            <v-col cols="12">
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search by any fields"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="players"
          :items-per-page="10"
          class="elevation-1"
          :search="search"
          :loading="loading"
          :loading-text="loadingText"
        >
          <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click="showItem(item)">
              mdi-eye
            </v-icon>
          </template>

          <template v-slot:top>
            <v-dialog v-model="dialogView" max-width="700px">
              <v-card>
                <v-img
                  src="https://www.dexerto.com/wp-content/uploads/2021/01/fifa-22-release-date.jpg"
                ></v-img>
                <v-card-text class="text-h5 my-5">
                  <v-row>
                    <v-col cols="7">
                      <p>
                        <strong class="mr-10">Name: </strong>
                      </p>
                    </v-col>
                    <v-col cols="4">
                      <p>
                        {{ player.commonName }}
                      </p>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="7">
                      <p>
                        <strong class="mr-10">Club: </strong>
                      </p>
                    </v-col>
                    <v-col cols="4">
                      <p>
                        {{ player.club }}
                      </p>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="7">
                      <p>
                        <strong class="mr-10">Nation: </strong>
                      </p>
                    </v-col>
                    <v-col cols="5">
                      <p>
                        {{ player.nation }}
                      </p>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="7">
                      <p>
                        <strong class="mr-10">League: </strong>
                      </p>
                    </v-col>
                    <v-col cols="4">
                      <p>
                        {{ player.league }}
                      </p>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="7">
                      <p>
                        <strong class="mr-10">Position: </strong>
                      </p>
                    </v-col>
                    <v-col cols="4">
                      <p>
                        {{ player.position }}
                      </p>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="7">
                      <p>
                        <strong class="mr-10">Age: </strong>
                      </p>
                    </v-col>
                    <v-col cols="4">
                      <p>
                        {{ player.age }}
                      </p>
                    </v-col>
                  </v-row>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="hideItem()"
                    >Cancel</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </template>
        </v-data-table>
      </v-card>
    </v-col>
    <v-snackbar v-model="snackbar" :timeout="timeout" :color="color" outlined>
      {{ snackbarText }}
    </v-snackbar>
  </v-row>
</template>

<script>
import Backend from '@/services/BackendServices'
export default {
  name: 'IndexPage',
  data() {
    return {
      search: '',
      loadingText: 'Loading... Please wait',
      searchByTeam: '',
      searchByPlayer: '',
      dialogView: false,
      loading: true,
      snackbar: false,
      snackbarText: '',
      color: '',
      timeout: 3000,
      players: [],
      headers: [
        {
          text: 'Name',
          align: 'start',
          sortable: true,
          value: 'commonName',
        },
        { text: 'Club', sortable: true, value: 'club' },
        { text: 'Nation', sortable: true, value: 'nation' },
        { text: 'League', sortable: true, value: 'league' },
        // { text: 'Position', sortable: false, value: 'position' },
        // { text: 'Age', sortable: false, value: 'age' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      player: {
        commonName: '',
        club: '',
        nation: '',
        league: '',
        position: '',
        age: '',
      },
    }
  },
  head: {
    title: 'Player List',
  },
  created() {
    this.listPlayers()
  },
  methods: {
    detectSearchIntent(e) {
      if (e.keyCode === 13) {
        this.listPlayersByTeam()
      }
    },
    listPlayers() {
      this.searchByTeam = ''
      Backend.listPlayers(this.searchByPlayer)
        .then(({ data }) => {
          this.players = data.data
          this.loading = false
        })
        .catch(() => {
          this.loadingText = 'Error to get data from server'
          this.snackbarText = 'Server error'
          this.color = 'error'
          this.snackbar = true
        })
    },
    listPlayersByTeam() {
      this.searchByPlayer = ''
      Backend.listPlayersByTeam(this.searchByTeam)
        .then(({ data }) => {
          this.players = data.data
          this.loading = false
        })
        .catch(() => {
          this.loadingText = 'Error to get data from server'
          this.snackbarText = 'Server error'
          this.color = 'error'
          this.snackbar = true
        })
    },
    showItem(item) {
      this.player = item
      this.dialogView = true
    },
    hideItem() {
      this.dialogView = false
      this.player = {
        commonName: '',
        club: '',
        nation: '',
        league: '',
        position: '',
        age: '',
      }
    },
  },
}
</script>
<style scoped>
.v-progress-circular {
  margin: 1rem;
}
</style>
