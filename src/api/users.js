import api from "../api";

export const signin = (data) => {
  return api.post("/users/signin", data);
};

export const users = () =>{
    return api.get("/users")
}