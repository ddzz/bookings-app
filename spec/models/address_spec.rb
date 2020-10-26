require 'rails_helper'

RSpec.describe Address, type: :model do
  context "validations" do
    it "requires all fields and a Booking association" do
      address = Address.new()
      expect(address).not_to be_valid

      address.update(street: "123 Main St", city: "Chicago", state: "IL", zip_code: "12345")
      expect(address).not_to be_valid

      booking = Booking.create(
        name: "Test User",
        email: "test@test.com",
        booking_type: "Housekeeping",
        booking_date: Date.today,
        booking_time: Time.now
      )
      address.booking = booking
      expect(address).to be_valid

    end
  end
end
