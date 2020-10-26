class BookingsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def options
    render plain: "ok"
  end

  def index
    if params[:filter].blank?
      @bookings = Booking.paginate(page: params[:page], per_page: 20)
    else
      @bookings = Booking.where(booking_type: params[:filter]).paginate(page: params[:page], per_page: 20)
    end
    render json: @bookings.to_json
  end

  def create
    begin
      @booking = Booking.new(params.require(:booking).permit(:name, :email, :address, :booking_type, :booking_date, :booking_time))
      @booking.booking_date = Date.parse(params[:booking_date])
      @address = Address.new(params[:address])
      @booking.address = @address
      if @booking.save!
        render json: @booking
      else
        render json: { error: "Could not save booking."}.to_json, status: :bad_request
      end
    rescue
      render json: { error: "Could not save booking."}.to_json, status: :bad_request
    end
  end
end
