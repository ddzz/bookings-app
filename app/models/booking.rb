class Booking < ApplicationRecord
  default_scope -> { order(id: :desc) }
  has_one :address
  validates :name, presence: true
  validates :email, presence: true
  validates :booking_type, presence: true
  validates :booking_date, presence: true
  validates :booking_time, presence: true

  accepts_nested_attributes_for :address

  def as_json(options={})
  {
    name: self.name,
    email: self.email,
    booking_type: self.booking_type,
    booking_date: self.booking_date,
    booking_time: self.booking_time&.strftime("%I:%M %p"),
    address: self.address
  }
end
end
