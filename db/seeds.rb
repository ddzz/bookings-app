require 'faker'

100.times do
  booking = Booking.new(
    name: Faker::Name.unique.name,
    email: Faker::Internet.unique.email,
    booking_type: ["Housekeeping", "Dog walk"].sample,
    booking_date: Faker::Date.unique.between(from: 365.days.ago, to: Date.today),
    booking_time: Faker::Time.unique.between(from: DateTime.now - 1, to: DateTime.now)
  )

  address = Address.new(
    street: Faker::Address.unique.street_address,
    city: Faker::Address.unique.city,
    state: Faker::Address.state_abbr,
    zip_code: Faker::Address.zip_code
  )

  booking.address = address
  booking.save!
end
