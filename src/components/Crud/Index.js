import React from "react";
import { child, getDatabase, get, ref, set, update } from "firebase/database";


class Crud extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            db: "",
            Equipment_serial_number: "",
            Equipment_group: "",
            Calibration_date: "",
            Calibration_due_date: "",
            Add_certificate: "",
        }
        this.interface = this.interface.bind(this);
    }
    componentDidMount() {
        this.setState({
            db: getDatabase()
        });
    }
    render() {
        return (
            <>
                <main>
                    <div className="box1">
                        <div className="forms-wrap1">
                            <div className="heading"><h2>Add Itme's</h2></div> <br />

                            <div class="input-wrap1">
                                <label className="userbox">Equipment Serial Number:</label>
                                <input type="text" id="userbox" value={this.state.Equipment_serial_number}
                                    onChange={e => { this.setState({ Equipment_serial_number: e.target.value }) }} />
                            </div>
                            <div class="input-wrap1">
                                <label className="userbox">Equipment Group:</label>
                                <input type="text" id="userbox" value={this.state.Equipment_group}
                                    onChange={e => { this.setState({ Equipment_group: e.target.value }) }} />
                            </div>
                            <div class="input-wrap1">
                                <label className="userbox">Calibration Date:</label>
                                <input type="date" id="datebox" value={this.state.Calibration_date}
                                    onChange={e => { this.setState({ Calibration_date: e.target.value }) }} />
                            </div>
                            <div class="input-wrap1">
                                <label className="userbox">Calibration Due Date:</label>
                                <input type="date" id="datebox" value={this.state.Calibration_due_date}
                                    onChange={e => { this.setState({ Calibration_due_date: e.target.value }) }} />
                            </div>
                            <div class="input-wrap1">
                                <label className="userbox">Add Certificate:</label>
                                <input type="text" id="userbox" value={this.state.Add_certificate}
                                    onChange={e => { this.setState({ Add_certificate: e.target.value }) }} />
                            </div>

                            <div className="button">
                                <div class="input-wrap"><button className="sign-btn" id="addBtn" onClick={this.interface}>Sumbit</button></div>
                                <div class="input-wrap"> <button className="sign-btn" id="updateBtn" onClick={this.interface}>Update Data</button></div>
                                <button className="sign-btn" id="selectBtn" onClick={this.interface}>Get Data from Db</button>
                            </div>
                        </div>
                    </div>
                </main>
            </>
        )
    }
    interface(event) {
        const id = event.target.id;

        if (id === "addBtn") {
            this.insertData();
        }
        else if (id === "updateBtn") {
            this.updateData();
        }
        else if (id === "selectBtn") {
            this.selectData();
        }
    }

    getAllInputs() {
        return {
            Equipment_serial_number: this.state.Equipment_serial_number,
            Equipment_group: this.state.Equipment_group,
            Calibration_date: this.state.Calibration_date,
            Calibration_due_date: this.state.Calibration_due_date,
            Add_certificate: this.state.Add_certificate,
        }
    }

    insertData() {
        const db = this.state.db;
        const data = this.getAllInputs();

        set(ref(db, 'Customer/' + data.Equipment_serial_number),
            {
                Equipment_group: data.Equipment_group,
                Calibration_date: data.Calibration_date,
                Calibration_due_date: data.Calibration_due_date,
                Add_certificate: data.Add_certificate
            })
            .then(()=>{alert("data was added successfully")})
            .catch((error) =>{alert("There was an error, details:"+error)});
    }

    updateData() {
        const db = this.state.db;
        const data = this.getAllInputs();

        update(ref(db, 'Customer/'+ data.Equipment_serial_number),
            {
                Equipment_group: data.Equipment_group,
                Calibration_date: data.Calibration_date,
                Calibration_due_date: data.Calibration_due_date,
                Add_certificate: data.Add_certificate
            })
            .then(()=>{alert("data was update successfully")})
            .catch((error) =>{alert("There was an error, details:"+error)});
    }

    selectData(){
        const dbref = ref(this.state.db);
        const Equipment_serial_number = this.getAllInputs().Equipment_serial_number;

        get(child(dbref, 'Customer/'+Equipment_serial_number)).then((sanpshot) =>{
            if(sanpshot.exists()) {
                this.setState({
                    Equipment_group: sanpshot.val().Equipment_group,
                    Calibration_date: sanpshot.val().Calibration_date,
                    Calibration_due_date: sanpshot.val().Calibration_due_date,
                    Add_certificate: sanpshot.val().Add_certificate,
                })
                
            }
            else{
                alert("no data found");
            }
        })
        .catch((error) =>{alert("ther was an error,details:"+error)})
    }
}
export default Crud