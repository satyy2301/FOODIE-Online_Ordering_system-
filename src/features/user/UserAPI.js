export function fetchLoggedInUserOrders(userId) {
    return new Promise(async (resolve) =>{
      const response = await fetch('http://localhost:8080/orders/user/'+userId) 
      const data = await response.json()
      resolve({data})
    }
    );
  }

  export function fetchLoggedInUser(userId) {
    return new Promise(async (resolve) =>{
      const response = await fetch('http://localhost:8080/users/'+userId) 
      const data = await response.json()
      resolve({data})
    }
    );
  }

  export function fetchAllUsers() {
    return new Promise(async (resolve) =>{
      const response = await fetch('http://localhost:8080/users/') 
      const data = await response.json();
      const totalUsers = await response.headers.get('X-Total-Count');
      resolve({ data: { users: data, totalUsers: +totalUsers } });
    }
    );
  }
  
  
  export function updateUser(update) {
    return new Promise(async (resolve) => {
      const response = await fetch('http://localhost:8080/users/'+update.id, {
        method: 'PATCH',
        body: JSON.stringify(update),
        headers: { 'content-type': 'application/json' },
      });
      const data = await response.json();
    
      resolve({ data });
    });
  }

  