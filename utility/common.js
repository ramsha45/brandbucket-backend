class APIFeatures {
  constructor(model,queryObj){
      this.model = model,
      this.queryObj = queryObj,
      this.query = null
  }

  //for filteration like where price=10, price<10 etc...
  filter(){
      //taking out sort param from query
      var {sort, fields, page, limit, ...resQuery} = this.queryObj;
      const queryStr = JSON.stringify(resQuery);
      var modifiedQuery = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g,(match) => `$${match}`)
      modifiedQuery = JSON.parse(modifiedQuery)
      
      //not resolving promise
      this.query = this.model.find(modifiedQuery);
      return this;
  }

  sort(){
      var {sort} = this.queryObj;
      if(sort) {
          sort = sort.split(",").join(" ")
          this.query = this.query.sort(sort)
      }
      else {
          this.query = this.query.sort("-createdAt") //- sign means sort in desc order.
      }
      return this
  }

  limitFields(){
      var {fields} = this.queryObj;
      if(fields){
          fields = fields.split(",").join(" ")
          this.query = this.query.select(fields)
      }
      else{
          this.query = this.query.select("-__v") //- means not to select this field
      }

      return this
  }

  pagination(){
      var {page,limit} = this.queryObj;
      page = parseInt(page) || 1
      limit = parseInt(limit) || 3
      var skip = --page * limit
      this.query = this.query.skip(skip).limit(limit)
      return this;
  }

  get(){
      return this.query;
  }
}

module.exports = APIFeatures