require 'rails_helper'

RSpec.describe BookingsController, type: :controller do
  before(:each) do
    @booking_1 = Booking.create!(
                  name: "Test User",
                  email: "test@test.com",
                  booking_type: "Housekeeping",
                  booking_date: Date.today,
                  booking_time: Time.now
                )
    @booking_2 = Booking.create!(
                  name: "Second User",
                  email: "test@example.com",
                  booking_type: "Dog walk",
                  booking_date: Date.today,
                  booking_time: Time.now
                )
  end

  context "GET /bookings" do
    it "returns all bookings" do
      get :index, params: { page: 1 }

      expect(response.status).to eql(200)

      body = JSON.parse(response.body)
      expect(body.length).to eql(2)
      expect(body[0]).to eql(JSON.parse(@booking_2.to_json))
      expect(body[1]).to eql(JSON.parse(@booking_1.to_json))
    end

    it "can filter by Booking type" do
      get :index, params: { page: 1, filter: "Dog walk" }

      body = JSON.parse(response.body)
      expect(body.length).to eql(1)
      expect(body[0]).to eql(JSON.parse(@booking_2.to_json))
    end
  end

  context "POST /bookings" do
    it "creates a new Note object with valid parameters" do
      post :create, params: { booking: {
                                          name: "Another User",
                                          email: "test@spruce.com",
                                          booking_type: "Housekeeping",
                                          booking_date: Date.today,
                                          booking_time: Time.now
                                        },
                              address: {
                                          street: "123 Main St",
                                          city: "Chicago",
                                          state: "IL",
                                          zip_code: "12345"
                                }}

      expect(response.status).to eql(200)
      expect(Booking.count).to eql(3)
      body = JSON.parse(response.body)
      expect(body["name"]).to eql("Another User")
      expect(body["email"]).to eql("test@spruce.com")
      expect(body["booking_type"]).to eql("Housekeeping")
    end

    it "does not create a new Note when parameters are invalid" do
      post :create, params: { booking: { name: "Not Enough Params" } }

      expect(response.status).to eql(400)
      expect(Booking.count).to eql(2)
      body = JSON.parse(response.body)
      expect(body["error"]).to eql("Could not save booking.")
    end
  end
end
