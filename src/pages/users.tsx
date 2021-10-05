import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Container } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/TextField";
import FormGroup from "@material-ui/core/FormGroup"
import Button from "@material-ui/core/Button"

import Drawer from '@material-ui/core/Drawer';

import Header from "../components/header";
const Users : React.FC = ()=>{

    const [open,setOpen] = React.useState<boolean>(false);
    const [name, setName] = React.useState<string>("");
    const [age, setAge] = React.useState<number>(0);
    const [country,setCountry] = React.useState<string>("");
    const [salary,setSalary] = React.useState<number>(0);
    const [userId,setUserId] = React.useState<number>();

    const useStyles = makeStyles({
        table: {
          minWidth: 470,
        },
        th:{
            minWidth:50,
            backgroundColor:"#5468a9",
            color:"#fff",
            fontWeight:"bold",
            height:40,
            fontSize:16
        },
        tr:{
            minWidth:50,
            backgroundColor:"#7488a9",
            color:"#fff"
        },
        trEdit:{
            width:100,
            backgroundColor:"#7488a9",
            color:"#fff",
        },
        container:{
            minWidth:470,
            maxWidth:"100%",
            padding:0,
            margin:0,
        },
        drawer:{
            width:450,
            backgroundColor:"#555585",
            color:"white",
            fontSize:"22px",
            textAlign:"center",
            height:"100vh"
        },
        input:{
            width:"90%",
            margin:"10px auto"
        }
      });

      function createData(id:number,name:string, age:number, country:string, salary:number) {
        return {id, name, age, country, salary };
  }
  // add data
  const [rows,setRows] = useState([
  createData(1,'John', 45, 'Canada', 5000),
  createData(2,'Mary', 25, 'London', 8500),
  createData(3,'Nick', 31, 'America', 7800),
  createData(4,'Sunil', 65, 'London', 4800),
  createData(5,'Rebecca', 51, 'America', 7500),
  ]);

  const classes = useStyles();

  const handler =(e:string)=>{
      console.log(e)
      let a:number;
      a = parseInt(e);
      setAge(a)
  }
  const salaryHandler =(e:string)=>{
    console.log(e)
    let a:number;
    a = parseInt(e);
    setSalary(a)
}
  const EditUser = (id:number)=>{
      setUserId(id);
       rows.filter(row=>{
          if(row.id==id){
            setName(row.name);
            setAge(row.age);
            setSalary(row.salary);
            setCountry(row.country)
          }
        });
        handleClose()
  }
  const DeleteUser = (id:number)=>{
    console.log(id)
    let newRows = rows.filter((row)=>{
        return row.id !==id
    });
    setRows(newRows);
  }
  const handleClose = ()=>{
      setOpen(!open)
  }
  const saveChange = ()=>{
        rows.map((row)=>{
            if(row.id==userId){
                row.age = age;
                row.country=country;
                row.name = name;
                row.salary = salary;
            }
        })
  }
  const AddUser = async(name:string,age:number,country:string,salary:number)=>{
            console.log(name,age,country,salary)
            let newId:number;
            newId = rows.length+1;
            let newObj={
                 id:newId,
                 name:name,
                 age:age,
                 country:country,
                 salary:salary
                }
                console.log(newObj)
                let newRows : any[]
                newRows = rows
                newRows.push(newObj);
              await  setRows(newRows);
  }
    return(
        <Container className={classes.container} >
            <Header AddUser={AddUser}/>
                <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">  
                <TableHead>
                <TableRow>
                    <TableCell className={classes.th}>Name</TableCell>
                    <TableCell className={classes.th} >Age</TableCell>
                    <TableCell className={classes.th} >Country</TableCell>
                    <TableCell className={classes.th} >Salary&nbsp;($)</TableCell>
                    <TableCell className={classes.th} >Editing</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {rows.map((row) => (
                    <TableRow key={row.name}>
                    <TableCell className={classes.tr} component="th" scope="row">
                    {row.name}
                    </TableCell>
                    <TableCell className={classes.tr} >{row.age}</TableCell>
                    <TableCell className={classes.tr} >{row.country}</TableCell>
                    <TableCell className={classes.tr} >{row.salary}</TableCell>
                    <TableCell className={classes.trEdit} >
                        <IconButton onClick={()=>EditUser(row.id)}><EditIcon style={{color:"white"}}/></IconButton>
                        <IconButton onClick={()=>DeleteUser(row.id)}> < DeleteIcon style={{color:"red"}}/></IconButton>
                         </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
                <Drawer  
                variant="temporary" 
                open={open} 
                onClose={handleClose}
                title="Editing User">
                    <div 
                            className={classes.drawer}>
                        Editing User
                        <FormGroup>
                            <Input type="text" className={classes.input} onChange={(e)=>setName(e.target.value)} value={name} />
                            <Input type="number" className={classes.input} onChange={(e)=>handler(e.target.value)} value={age}  />
                            <Input type="text" className={classes.input} onChange={(e)=>setCountry(e.target.value)} value={country} />
                            <Input type="number" className={classes.input} onChange={(e)=>salaryHandler(e.target.value)} value={salary} />
                            <Button onClick={saveChange} style={{color:"white",backgroundColor:"blueviolet",margin:"10px auto",width:"200px"}} variant="contained">Edit</Button>
                        </FormGroup>
                    </div>
                </Drawer>
                {/* <Drawer  
                variant="temporary" 
                open={open} 
                onClose={handleClose}
                title="Editing User">
                    <div 
                            className={classes.drawer}>
                        Editing User
                        <FormGroup>
                            <Input className={classes.input} placeholder="User Name" value={name} />
                            <Input className={classes.input} placeholder="User Age" value={age} />
                            <Input className={classes.input} placeholder="User Country" value={country} />
                            <Input className={classes.input} placeholder="User Salary" value={salary} />
                            <Button style={{color:"white",backgroundColor:"blueviolet",margin:"10px auto",width:"200px"}} variant="contained">Edit</Button>
                        </FormGroup>
                    </div>
                </Drawer> */}
    </Container>
    )
}

export default Users;