const { Request, Response }= require("express")
const Restaurant= ("../models/restaurant")

exports.searchRestaurant = async (req, res) => {
  try {
    const city = req.params.city

    const searchQuery = (req.query.searchQuery.toString()) || ""
    const selectedCuisines = (req.query.selectedCuisines.toString()) || ""
    const sortOption = (req.query.sortOption.toString()) || "lastUpdated"
    const page = parseInt(req.query.page.toString()) || 1

    let query = {}

    query["city"] = new RegExp(city, "i")

    const cityCheck = await Restaurant.countDocuments(query)

    if (cityCheck === 0) {
      return res.status(404).json({
        data: [],
        pagination: {
          total: 0,
          page: 1,
          pages: 1,
        },
      })
    }

    // [butter chicken, panner]
    if (selectedCuisines) {
      const cuisinesArray = selectedCuisines
        .split(",")
        .map((cuisine) => new RegExp(cuisine, "i"))

      query["cuisines"] = { $all: cuisinesArray }
    }

    if (searchQuery) {
      const searchRegex = new RegExp(searchQuery, "i")

      query["$or"] = [
        { restaurantName: searchRegex },
        { cuisines: { $in: [searchRegex] } },
      ]
    }

    const pageSize = 5
    const skip = (page - 1) * pageSize

    const restaurant = await Restaurant.find(query)
      .sort({ [sortOption]: 1 })
      .skip(skip)
      .limit(pageSize)
      .lean()

    const total = await Restaurant.countDocuments(query)

    const response = {
      data: restaurant,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / pageSize),
      },
    }

    res.json(response)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Internal Server Error" })
  }
}

exports.getRestaurant = async (req, res) => {
  try {
    const restaurantId = req.params.restaurantId

    const restaurant = await Restaurant.findById(restaurantId)

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" })
    }

    res.json(restaurant)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Internal Server Error" })
  }
}