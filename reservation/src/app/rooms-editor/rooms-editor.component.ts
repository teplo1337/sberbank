import { Component, OnInit } from '@angular/core';
import { ArrayType } from '@angular/compiler/src/output/output_ast';
import { ReservationService } from '../reservation.service';
import { Room, RoomsDocument } from '../data-model';

@Component({
  selector: 'app-rooms-editor',
  templateUrl: './rooms-editor.component.html',
  styleUrls: ['./rooms-editor.component.less']
})
export class RoomsEditorComponent implements OnInit {
  roomsDocument: RoomsDocument;
  rooms: Room [];
  new: Room;
  success = false;
  modifyError = false;
  nameError = false;

  constructor(private reservationService: ReservationService) { }

   ngOnInit() {
    this.initComponent();
  }

  async initComponent() {
    this.success = false;
    this.modifyError = false;
    this.nameError = false;

    this.rooms = await this.getRooms();
    this.new = new Room;
  }

  getRooms(): Promise<Array<Room>> {
    return new Promise ((resolve) => {
      this.reservationService.getRooms().subscribe(
        (result: RoomsDocument) => {
          this.roomsDocument = result;
          const temp: Room [] = result.data.map((room, index) => {
            return {
              name: room,
              times: [],
              id: index
            };
          });
          resolve(temp);
        },
        (err) => {
          resolve(err);
        }
      );
    });
  }

  deleteRoom(i) {
    if (this.rooms.length > 1) {
      this.rooms.splice(i, 1);
    }
  }

  editRooms() {
    this.roomsDocument = {
      data: this.rooms.map((room) => {
        return room.name;
      }),
      type: 'rooms',
      _id: '5a69ba75f36d286a1cb3360f'
    };

    this.reservationService.modifyRooms(this.roomsDocument).subscribe(
      (result: RoomsDocument) => {
        this.success = true;
        setTimeout(() => {
          this.initComponent();
        }, 1500);
      },
      (err) => {
        this.modifyError = true;
        console.log(err);
      }
    );
  }

  createRoom(room: Room) {
    if (room.name) {
      this.rooms.push({
        name: room.name,
        times: [],
        id: this.rooms.length
      });
      room.name = '';
    } else {
      this.nameError = true;
    }
  }
}
