class RemoveAddressFromBookings < ActiveRecord::Migration[6.0]
  def change
    remove_column :bookings, :address, :string
  end
end
