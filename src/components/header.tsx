import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import Input from "@material-ui/core/TextField";
import FormGroup from "@material-ui/core/FormGroup"

const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
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
}));
type Props = {
    AddUser: (name:string,age:number,country:string,salary:number) => void;
  };
const Header:React.FC<Props> = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [name, setName] = React.useState<string>("");
  const [age, setAge] = React.useState<number>(0);
  const [country,setCountry] = React.useState<string>("");
  const [salary,setSalary] = React.useState<number>(0);
  const [userId,setUserId] = React.useState<number>();

  const handleOpen = () => {
    setOpen(true);
  };
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

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          className={classes.menuButton}
          onClick={()=>setOpen(true)}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          Information about users
        </Typography>
        <Button color="inherit" onClick={handleOpen}>
          Add user
        </Button>
      </Toolbar>
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
                            <Button onClick={()=>props.AddUser(name,age,country,salary)} style={{color:"white",backgroundColor:"blueviolet",margin:"10px auto",width:"200px"}} variant="contained">Add User</Button>
                        </FormGroup>
                    </div>
                </Drawer>
    </AppBar>
  );
};

export default Header;