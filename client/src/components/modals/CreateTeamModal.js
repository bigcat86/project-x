import React, {useState} from "react";
import UserCard from "../UserCard";
import * as Icon from 'react-bootstrap-icons';
import { Link } from "react-router-dom";

export default function CreateTeamModal() {

    const [showTextBox, setShowTextBox] = useState(false);

    const showText = () => {
        setShowTextBox(true);
      };
    
    const hideText = () => {
        setShowTextBox(false);
      };
    
    return(
        <div>
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createTeam">
        Launch demo modal
        </button>


        <div class="modal fade" id="createTeam" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" data-bs-target="createTeam" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                ...
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Save changes</button>
            </div>
            </div>
        </div>
        </div>
        </div>
    )
}