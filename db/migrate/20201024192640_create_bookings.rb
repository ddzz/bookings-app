class CreateBookings < ActiveRecord::Migration[6.0]
  def change
    create_table :bookings do |t|
      t.string :email
      t.string :name
      t.text :address
      t.text :booking_type
      t.date :booking_date
      t.time :booking_time
    end
  end
end
