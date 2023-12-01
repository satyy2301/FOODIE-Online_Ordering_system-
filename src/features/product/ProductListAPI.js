
export function fetchProductById(id) {
  return new Promise(async (resolve) =>{
  
    const response = await fetch('http://localhost:8080/products/'+id) 
    const data = await response.json()
    resolve({data})
  }
  );
}
export function createProduct(product) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/products/', {
      method: 'POST',
      body: JSON.stringify(product),
      headers: { 'content-type': 'application/json' },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function updateProduct(update) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      'http://localhost:8080/products/' + update.id,
      {
        method: 'PATCH',
        body: JSON.stringify(update),
        headers: { 'content-type': 'application/json' },
      }
    );
    const data = await response.json();
  
    resolve({ data });
  });
}

export function fetchProductsByFilter(filter, sort, pagination,admin) {
  
  console.log("sdmin : ",admin)
  console.log("filter : ",filter)
  const { filter: newfilter, sort: sortfilter, pagination: pagefilter } = filter;



  console.log("filter : ",filter)
  console.log("sdmin : ",admin)
  let queryString = '';
  for (let key in newfilter) {
    const categoryValues = newfilter[key];
   

    if (categoryValues.length) {
  
      const lastCategoryValue = categoryValues[categoryValues.length - 1]
      console.log(`${key}`);
      queryString += `${key}=${lastCategoryValue}&`
    }
  }
  for (let key in sortfilter) {
    queryString += `${key}=${sortfilter[key]}&`
    
  }

  for (let key in pagefilter) {
    queryString += `${key}=${pagefilter[key]}&`
  }
  if(admin){
    queryString += `admin=true`;
  }


  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch('http://localhost:8080/products?' + queryString);
      if (!response.ok) {
    
        reject(new Error(`HTTP Error: ${response.status}`));
        return;
      }
      const data = await response.json()
      const totalItems = await response.headers.get('X-Total-Count')
      resolve({ data: { products: data, totalItems: +totalItems } })
    } catch (error) {
    
      reject(error);
    }
  });
}

export function fetchCategories() {
  return new Promise(async (resolve,reject) =>{
    try {
      const response = await fetch('http://localhost:8080/categories');
      if (!response.ok) {
        
        reject(new Error(`HTTP Error: ${response.status}`));
        return;
      }
  
      const data = await response.json()
      const totalcategories = await response.headers.get('X-Total-Count')
      resolve({ data: { categories: data, totalcategories: +totalcategories } })
    } catch (error) {
      
      reject(error);
    }
  }
  );
}
