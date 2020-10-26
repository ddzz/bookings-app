# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_10_25_141252) do

  create_table "addresses", force: :cascade do |t|
    t.string "street"
    t.string "city"
    t.string "state"
    t.string "zip_code"
    t.integer "booking_id", null: false
    t.index ["booking_id"], name: "index_addresses_on_booking_id"
  end

  create_table "bookings", force: :cascade do |t|
    t.string "email"
    t.string "name"
    t.text "booking_type"
    t.date "booking_date"
    t.time "booking_time"
  end

  add_foreign_key "addresses", "bookings"
end
