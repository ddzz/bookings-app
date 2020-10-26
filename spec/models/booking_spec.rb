require 'rails_helper'

RSpec.describe Booking, type: :model do
  context "validations" do
    it "requires all fields " do
      booking = Booking.new()
      expect(booking).not_to be_valid

      booking.update!(
        name: "Test User",
        email: "test@test.com",
        booking_type: "Housekeeping",
        booking_date: Date.today,
        booking_time: Time.now
      )
      expect(booking).to be_valid
    end
  end
end
