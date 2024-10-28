<template>
    <h1 style="text-align:center;font-family: 'Inria Sans';background-color: #eeffff;font-size: 2.4vw;">Yuhua Village Market and Food Centre</h1>

    <div class="StallArrangement">
        <!-- code here for stalls, should change color for the selected stall -->
         <div class = "stall" id = "001">Chicken Rice</div>
         <div class = "stall" id = "002">Noodle</div>
         <div class = "stall" id = "003">Mixed Rice</div>
    </div>

    <div id= "Seating">  
        
        <div class = "SeatSet">
            <div class = "SeatArrangement">
                <!-- able to select seats that are grey, cannot select seats that are red -->
                 <div class = "SeatSection">
                    <button class = "Seat" id = "A35">A</button>
                    <button class = "Seat" id = "A36">A</button>
                 </div>
        
                 <div class = "TableSection">
                    <div class = "table">35</div>
                    <div class = "table">36</div>
                 </div>
        
                 <div class = "SeatSection">
                    <button class = "Seat" id = "B35">B</button>
                    <button class = "Seat" id = "B36">B</button>
                 </div>
        
            </div>

            <div class = "SeatArrangement">
                <!-- able to select seats that are grey, cannot select seats that are red -->
                 <div class = "SeatSection">
                    <button class = "Seat" id = "A37">A</button>
                    <button class = "Seat" id = "A38">A</button>
                    <button class = "Seat" id = "A39">A</button>
                 </div>
        
                 <div class = "TableSection">
                    <div class = "table">37</div>
                    <div class = "table">38</div>
                    <div class = "table">39</div>
                 </div>
        
                 <div class = "SeatSection">
                    <button class = "Seat" id = "B37">B</button>
                    <button class = "Seat" id = "B38">B</button>
                    <button class = "Seat" id = "B39">B</button>
                 </div>
        
            </div>
        </div>

        <div class = "CircleSeatArrangement">
            <!-- able to select seats that are grey, cannot select seats that are red -->
             <div class = "CircleSection">
    
                <span class = "circletable">10</span>
    
                <button class = "Seat seat-left" id = "10A">A</button>
                <button class = "Seat seat-bottom" id = "10B">B</button>
                <button class = "Seat seat-right" id = "10C">C</button>
    
             </div>    
    
        </div>

        <div class = "SeatSet">
            <div class = "SeatArrangement">
                <!-- able to select seats that are grey, cannot select seats that are red -->
                 <div class = "SeatSection">
                    <button class = "Seat" id = "A40">A</button>
                    <button class = "Seat" id = "A41">A</button>
                 </div>
        
                 <div class = "TableSection">
                    <div class = "table">40</div>
                    <div class = "table">41</div>
                 </div>
        
                 <div class = "SeatSection">
                    <button class = "Seat" id = "B40">B</button>
                    <button class = "Seat" id = "B41">B</button>
                 </div>
        
            </div>


            <div class = "SeatArrangement">
                <!-- able to select seats that are grey, cannot select seats that are red -->
                 <div class = "SeatSection">
                    <button class = "Seat" id = "A42">A</button>
                    <button class = "Seat" id = "A43">A</button>
                    <button class = "Seat" id = "A44">A</button>
                 </div>
        
                 <div class = "TableSection">
                    <div class = "table">42</div>
                    <div class = "table">43</div>
                    <div class = "table">44</div>
                 </div>
        
                 <div class = "SeatSection">
                    <button class = "Seat" id = "B42">B</button>
                    <button class = "Seat" id = "B43">B</button>
                    <button class = "Seat" id = "B44">B</button>
                 </div>
        
            </div>
        </div>
        
    </div>


    <div id = "Legend">
        <!-- able to display what has been chosen -->
         <div id = "FreeLabel">
            <div id="FreeSeatBlank"></div>
            <p><strong>Free</strong></p>
        </div>
        <div id = "SelectedLabel">
            <div id="SelectedSeatBlank"></div>
            <p><strong>Selected</strong></p>
        </div>
        <div id = "OccupiedLabel">
            <div id="OccupiedSeatBlank"></div>
            <p><strong>Occupied</strong></p>
        </div>

        <button id="SaveButton" @click="saveToFS"><img id = "floppy" src = "/floppydisk.png" alt = "floppydisk"> Save</button>
    </div>

    <div v-if="showMaxModal" class="modal-overlay">
      <div class="modal-content">
        <button class="close-button" @click="closeModal">&times;</button>
        <div class="modal-text">
          <h2>Maximum of {{ maxSeats }} seats reached!</h2>
          <p>Please deselect a few seats to continue.</p>
          <div class="modal-actions">
            <button @click="closeModal">Go back to seat booking</button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showNoSeatModal" class="modal-overlay">
      <div class="modal-content">
        <button class="close-button" @click="closeModal">&times;</button>
        <div class="modal-text">
          <h2>Ypu have not selected any seats</h2>
          <p>Please select a few seats to continue.</p>
          <div class="modal-actions">
            <button @click="closeModal">Go back to seat booking</button>
          </div>
        </div>
      </div>
    </div>

</template>

<script>
import firebaseApp from '@/firebase.js';
import { getFirestore } from 'firebase/firestore';
import {collection, getDocs, doc, deleteDoc, setDoc} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const db = getFirestore(firebaseApp);

export default {
    data() {
        return {
            seatsChosen: [],
            numSeatsChosen: 0,
            maxSeats: 5,

            name: 'guest',
            email: 'guest',
            user:false,
            showMaxModal: false,
            showNoSeatModal: false,
        };
    },
    async mounted() {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                this.user = user;
                this.setProfile();
            }
        })

        const seatButtons = Array.from(document.getElementsByClassName('Seat'));
        let numSeatsLeft = await seatsLeft();
        
        seatButtons.forEach(button => {
            // console.log(numSeatsLeft);
            // console.log(this.seatsChosen);

            if (numSeatsLeft <= 5) {
                this.maxSeats = 2;
            }
           
            button.addEventListener('click', () => {
                if (button.getAttribute('data-selected') === 'true') {
                    // button.style.backgroundColor = '#D9D9D9';
                    button.setAttribute('data-selected', 'false');
                    button.classList.remove('selected');
                    this.removeSeat(button.id); 
                } else {
                    if (this.numSeatsChosen >= this.maxSeats) {
                        this.showMaxModal = true;
                        return;
                    }
                    // button.style.backgroundColor = '#51E51C'; 
                    button.setAttribute('data-selected', 'true');
                    button.classList.add('selected');
                    this.addSeat(button.id); 
                }
                console.log(this.seatsChosen);
            });

        });

        async function display() {
            let allSeatsTaken = await getDocs(collection(db, "Seats"));
            allSeatsTaken.forEach(async (docs) => {
                let documentData = docs.data();
                let EndTime = documentData.EndTime;
                let timeDiff = 0;

                if (EndTime){
                    let endTime = EndTime.toDate();
                    // console.log(timeSelected);
                    let currentTime = new Date();
                    // console.log(currentTime);
                    timeDiff = currentTime - endTime;
                }

                // console.log(timeDiff);
                

                if (timeDiff > 0){ //the end time has passed
                    await deleteDoc(doc(db, "Seats", docs.id));
                    console.log(`Customer: ${docs.id} has been deleted.`);
                } else {
                    let arrSeats = documentData.SeatsChosen;

                    arrSeats.forEach((seat)=> {
                        document.getElementById(seat).disabled = true;
                    });
                }
            });
        }

        async function seatsLeft(){
            let SeatsLeft = 23;

            let allSeatsTaken = await getDocs(collection(db, "Seats"));
            allSeatsTaken.forEach(async (docs) => {
                let documentData = docs.data();
                let num = documentData.NumSeats;

                SeatsLeft -= num;
            });

            return SeatsLeft;
        }

        display();

    },
    methods: {
        addSeat(seatId) {
            if (!this.seatsChosen.includes(seatId)) {
                this.seatsChosen.push(seatId); 
            }
            this.numSeatsChosen ++;
        },
        removeSeat(seatId) {
            this.seatsChosen = this.seatsChosen.filter(seat => seat !== seatId);
            this.numSeatsChosen --;
        },

        async saveToFS(){
            if (this.numSeatsChosen <1) {
                // i.e. user clicks save without choosing any seats
                this.showNoSeatModal = true;
                return
            } else {
                console.log("saved to fs");

                let customer = this.email;
                let newSeatsChosen = this.seatsChosen;
                let numSeats = this.numSeatsChosen;

                try{
                    await setDoc(doc(db, "Seats", customer+" "+ new Date().toISOString()),{
                        Customer: customer,
                        StartTime: new Date(), 
                        EndTime: new Date(new Date().getTime() + 60000), //1 min
                        SeatsChosen: newSeatsChosen,
                        NumSeats: numSeats
                    })
                    let allOrders = await getDocs(collection(db, 'Cart'))

                    for (const docs of allOrders.docs) {
                        let docsData = docs.data();
                        let docUserID = docsData.userId;
                        let seatList = '';

                        if (docUserID === this.user.uid) {
                            if (this.seatsChosen.length == 1) {
                                seatList += this.seatsChosen[0];
                                //console.log(seatList);
                            } else {
                                for (const key in this.seatsChosen) {
                                    if (key == 0) {
                                        seatList += this.seatsChosen[0];
                                    } else {
                                        seatList = seatList + ', ' + this.seatsChosen[key];
                                        //console.log(seatList);
                                    }
                                }
                            }
                            
                            docsData.seats = seatList;
                            docsData.dateCreated = new Date().toISOString();
                            await setDoc(doc(db, 'PlacedCustOrders', docs.id), docsData)
                            await deleteDoc(doc(db, 'Cart', docs.id));
                        }
                    }
                    // alert("Your seat has been reserved.");
                        //location.reload();
                                            
                }
                catch(error) {
                    console.error("Error adding document: ", error)
                }
            }  
            this.$router.push('/livereceipt')         
        },

        disableSeat(seatId){
            console.log("disable seat: "+seatId);
            document.getElementById(seatId).disabled = true;
        },

        setProfile() {
            this.name = this.user.displayName;
            this.email = this.user.email;
        },

        closeModal() {
            this.showMaxModal = false;
            this.showNoSeatModal = false;
        }
    }
  }
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inria+Sans:wght@400;700&display=swap');

body,
html {
  height: 100%;
  margin: 0;
  display: flex;
  flex-direction: column;
  font-family: 'Inria Sans';
}

button {
  font-family: 'Inria Sans';
  font-size: 1.1vw;
}

.Seat {
  background-color: #d9d9d9;
  height: 4vw;
  width: 4vw;
  border-radius: 0.75vw;
  border-color: transparent;
}

.Seat:not(.selected):not([disabled]):hover {
    background-color: #afafaf;
}

.Seat.selected {
    background-color: #51E51C;
}

    .table {
        background-color: #C6D4D4;
        height: 4.5vw;
        width: 5.5vw;
        margin: 0.75vw 0.75vw;
        display: flex;
        text-align: center;
        align-items: center;
        justify-content: center;
        font-size: 1.1vw;

        font-family: 'Inria Sans';
    }

.SeatSection {
  display: flex;
  flex-direction: column;
  gap: 1.1vw;
}

.SeatArrangement {
  display: flex;
  align-items: center;
  margin-top: 2vw;
}

.CircleSeatArrangement {
  margin-top: -3vw;
}

.StallArrangement {
  display: flex;
  align-items: center;
  justify-content: center;
}

.stall {
  background-color: #222831;
  height: 3vw;
  width: 30%;
  margin: 0vw 3vw 1.5vw 3vw;
  color: white;

        display: flex;
        text-align: center;
        align-items: center;
        justify-content: center;
        font-size: 1.1vw;
        font-family: 'Inria Sans';
    }

.circletable {
  height: 4vw;
  width: 4vw;
  background-color: #c6d4d4;
  border-radius: 50%;
  display: inline-block;

  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  font-size: 1.1vw;

        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        font-family: 'Inria Sans';
    }

.CircleSection {
  position: relative;
  width: 15vw;
  height: 10vw;
}

.seat-bottom {
  position: absolute;
  bottom: -15%;
  left: 50%;
  transform: translate(-50%, 0);
}

.seat-left {
  position: absolute;
  top: 50%;
  left: 5%;
  transform: translate(0, -50%);
}

.seat-right {
  position: absolute;
  top: 50%;
  right: 5%;
  transform: translate(0, -50%);
}

    #Seating {
        display: flex;
        justify-content: center;
        gap: 1em;
    }

#Legend {
  background-color: #eeffff;
  width: 100%;
  height: auto;
  flex-grow: 1;
  margin-top: 1vh;

        display: flex;
        text-align: center;
        align-items: center;
        justify-content: center;
        font-size: 1.1vw;
        font-family: 'Inria Sans';
    }

#FreeLabel,
#SelectedLabel,
#OccupiedLabel {
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  margin: 1vw 3vw;
}

#FreeSeatBlank,
#SelectedSeatBlank,
#OccupiedSeatBlank {
  background-color: #d9d9d9;
  height: 4vw;
  width: 4vw;
  border-radius: 0.75vw;
  border-color: transparent;
  margin-right: 1em;
}

#SelectedSeatBlank {
  background-color: #51e51c;
}

#OccupiedSeatBlank {
  background-color: #ff2505;
}

#SaveButton {
  width: 15vw;
  height: 4.5vw;
  margin-left: 10vw;
  border-radius: 0.75vw;
  border-color: transparent;
  background-color: #00adb5;
  color: white;
  font-size: 2vw;

  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;

        text-indent:2vw;
    }

    button:disabled {
        background-color: #FF2505; 
        color: white;           
        opacity: 1.0;              
    }

#floppy {
    width: 3.3vw;
}

#SaveButton:hover {
    background-color: #058b92;
}

/* Modal styling */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  font-family: 'Inria Sans', sans-serif;
}

.modal-content {
  background-color: #ffffff;
  border: 2px solid #00adb5;
  width: 400px;
  padding: 30px;
  position: relative;
  z-index: 1010;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: #00adb5;
  color: white;
  border: none;
  border-radius: 6px;
  width: 30px;
  height: 30px;
  font-size: 24px;
  cursor: pointer;
  text-align: center;
}

.modal-text h2 {
  margin-bottom: 10px;
  color: #00adb5;
  text-align: center;
  font-size: 24px;
}

.modal-text p {
  font-size: 18px;
  line-height: 1.5;
  text-align: center;
  margin-bottom: 20px;
  color: #00adb5;
}

.modal-actions {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.modal-actions button {
  background-color: #00adb5;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  width: 100%;
  text-align: center;
  font-size: 15px;
  margin-bottom: 10px;
}

.modal-actions button:last-child {
  margin-bottom: 0;
}

.modal-actions button:hover {
  background-color: #007a80;
}
</style>