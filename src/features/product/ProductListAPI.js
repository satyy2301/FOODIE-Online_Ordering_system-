// A mock function to mimic making an async request for data
export function fetchAllProducts() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch('http://localhost:3001/products');
      if (!response.ok) {
        // If the response is not ok (e.g., 404 or 500), reject the Promise
        reject(new Error(`HTTP Error: ${response.status}`));
        return;
      }

      const data = await response.json();
      resolve({ data });
    } catch (error) {
      // Handle any other errors that might occur during the fetch or JSON parsing
      reject(error);
    }
  });
}
export function fetchProductById(id) {
  return new Promise(async (resolve) =>{
    //TODO: we will not hard-code server URL here
    const response = await fetch('http://localhost:3001/products/'+id) 
    const data = await response.json()
    resolve({data})
  }
  );
}
export function createProduct(product) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:3001/products/', {
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
      'http://localhost:3001/products/' + update.id,
      {
        method: 'PATCH',
        body: JSON.stringify(update),
        headers: { 'content-type': 'application/json' },
      }
    );
    const data = await response.json();
    // TODO: on server it will only return some info of user (not password)
    resolve({ data });
  });
}

export function fetchProductsByFilter(filter, sort, pagination) {
  // filter = {"category":["smartphone","laptops"]}
  // sort = {_sort:"price",_order="desc"}

  // TODO : on server we will support multi values in filter

  const { filter: newfilter, sort: sortfilter, pagination: pagefilter } = filter;
  console.log(newfilter)
  console.log(sortfilter)
  console.log(pagefilter)



  console.log(filter)
  let queryString = '';
  for (let key in newfilter) {
    const categoryValues = newfilter[key];
   

    if (categoryValues.length) {
      // last selected category //
      const lastCategoryValue = categoryValues[categoryValues.length - 1]
      console.log(`${key}`);
      queryString += `${key}=${lastCategoryValue}&`
    }
  }
  for (let key in sortfilter) {
    queryString += `${key}=${sortfilter[key]}&`
    
  }
  console.log(pagination)
  for (let key in pagefilter) {
    queryString += `${key}=${pagefilter[key]}&`
  }


  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch('http://localhost:3001/products?' + queryString);
      if (!response.ok) {
        // If the response is not ok (e.g., 404 or 500), reject the Promise
        reject(new Error(`HTTP Error: ${response.status}`));
        return;
      }
      const data = await response.json()
      const totalItems = await response.headers.get('X-Total-Count')
      resolve({ data: { products: data, totalItems: +totalItems } })
    } catch (error) {
      // Handle any other errors that might occur during the fetch or JSON parsing
      reject(error);
    }
  });
}

export function fetchCategories() {
  return new Promise(async (resolve,reject) =>{
    try {
      const response = await fetch('http://localhost:3001/categories');
      if (!response.ok) {
        // If the response is not ok (e.g., 404 or 500), reject the Promise
        reject(new Error(`HTTP Error: ${response.status}`));
        return;
      }
      console.log('api is detching')
      const data = await response.json();
      resolve({ data });
    } catch (error) {
      // Handle any other errors that might occur during the fetch or JSON parsing
      reject(error);
    }
  }
  );
}
