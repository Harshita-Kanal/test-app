import React, { useEffect, useState }  from "react";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import './App.css';

function App() {
  const [options, setOptions] = useState([]);
  const [firstName, setFirstName] = useState("")
  const [state, setSubmittedState] = useState("")

  useEffect(() => {
      const url = "https://cdn-api.co-vin.in/api/v2/admin/location/states";

      const fetchData = async () => {
          try {
              const response = await fetch(url);
              const json = await response.json();
              console.log(json);
              var options = []
              json.states.forEach(element => {
                  options.push({value: element.state_name, label: element.state_name })
              });
              setOptions(options);
          } catch (error) {
              console.log("error", error);
          }
      };

      fetchData();
  }, []);

  const { control,  handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => {
    setFirstName(data?.firstName)
    setSubmittedState(data.State?.value)
  }


  return (
    <div className="App">
    <br/>
    <br/>
    <h1>Test form</h1>
     <form onSubmit={handleSubmit(onSubmit)}>
       <label>Name
      <Controller
        name="firstName"
        control={control}
        rules={{ pattern: /^[A-Za-z]+$/i, message: "Name must be alphabetic" } }
        defaultValue=""
        render={({ field }) => <input {...field} />}
      />
      </label>
      <p>{errors.firstName && "Name must not contain numbers and special characers"}</p> 

      <label>State
      <Controller
        name="State"
        control={control}
        render={({ field }) => <Select 
          className = "select"
          {...field} 
          options={options} 
        />}
      />
      </label>
      <div className = "center">
      <input type="submit" />
      </div>
    </form>
     {firstName !== "" && state !== "" ? <h3> Submitted data is:</h3>: <div></div>}   
     {firstName !== "" ?<span>Name:  {firstName}</span> : ""} <br/>
     {state !== "" && state !== undefined ? <span>State:  {state}</span>: ""}
    </div>
  );
}

export default App;
