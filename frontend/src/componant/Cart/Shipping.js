import React, { Fragment, useState } from "react";
import "./Shipping.css";
import { useSelector, useDispatch } from "react-redux";
import { saveShippingInfo } from "../../action/CartAction";
import MetaData from "../layout/MetaData";
import { Country, State } from "country-state-city";
import { useAlert } from "react-alert";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useNavigate  } from "react-router-dom";


const PhoneIcon=<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M6.54 5c.06.89.21 1.76.45 2.59l-1.2 1.2c-.41-1.2-.67-2.47-.76-3.79h1.51m9.86 12.02c.85.24 1.72.39 2.6.45v1.49c-1.32-.09-2.59-.35-3.8-.75l1.2-1.19M7.5 3H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.49c0-.55-.45-1-1-1-1.24 0-2.45-.2-3.57-.57-.1-.04-.21-.05-.31-.05-.26 0-.51.1-.71.29l-2.2 2.2c-2.83-1.45-5.15-3.76-6.59-6.59l2.2-2.2c.28-.28.36-.67.25-1.02C8.7 6.45 8.5 5.25 8.5 4c0-.55-.45-1-1-1z"/></svg>
const PinDropIcon =<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 4c1.93 0 5 1.4 5 5.15 0 2.16-1.72 4.67-5 7.32-3.28-2.65-5-5.17-5-7.32C7 5.4 10.07 4 12 4m0-2C8.73 2 5 4.46 5 9.15c0 3.12 2.33 6.41 7 9.85 4.67-3.44 7-6.73 7-9.85C19 4.46 15.27 2 12 2z"/><path d="M12 7c-1.1 0-2 .9-2 2s.9 2 2 2a2 2 0 1 0 0-4zM5 20h14v2H5v-2z"/></svg>
const TransferWithinAStationIcon=<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M16.49 15.5v-1.75L14 16.25l2.49 2.5V17H22v-1.5h-5.51zm3.02 4.25H14v1.5h5.51V23L22 20.5 19.51 18v1.75zM9.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM5.75 8.9L3 23h2.1l1.75-8L9 17v6h2v-7.55L8.95 13.4l.6-3C10.85 12 12.8 13 15 13v-2c-1.85 0-3.45-1-4.35-2.45l-.95-1.6C9.35 6.35 8.7 6 8 6c-.25 0-.5.05-.75.15L2 8.3V13h2V9.65l1.75-.75"/></svg>
const PublicIcon=<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM4 12c0-.61.08-1.21.21-1.78L8.99 15v1c0 1.1.9 2 2 2v1.93C7.06 19.43 4 16.07 4 12zm13.89 5.4c-.26-.81-1-1.4-1.9-1.4h-1v-3c0-.55-.45-1-1-1h-6v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41C17.92 5.77 20 8.65 20 12c0 2.08-.81 3.98-2.11 5.4z"/></svg>
const LocationCityIcon =<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M15 11V5l-3-3-3 3v2H3v14h18V11h-6zm-8 8H5v-2h2v2zm0-4H5v-2h2v2zm0-4H5V9h2v2zm6 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V9h2v2zm0-4h-2V5h2v2zm6 12h-2v-2h2v2zm0-4h-2v-2h2v2z"/></svg>
const HomeIcon=<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 5.69l5 4.5V18h-2v-6H9v6H7v-7.81l5-4.5M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z"/></svg>

const Shipping = () => {
    const navigate=useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();
    const { shippingInfo } = useSelector((state) => state.cart);
  
    const [address, setAddress] = useState(shippingInfo.address)
    const [city, setCity] = useState(shippingInfo.city);
    const [state, setState] = useState(shippingInfo.state);
    const [country, setCountry] = useState(shippingInfo.country);
    const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);
    
    const shippingSubmit = (e) => {
      e.preventDefault();
  
      if (phoneNo.length < 10 || phoneNo.length > 10) {
        alert.error("Phone Number should be 10 digits Long");
        return;
      }
      dispatch(
        saveShippingInfo({ address, city, state, country, pinCode, phoneNo })
      );
      navigate("/order/confirm");
    };
    return (
        <Fragment>
        <MetaData title="Shipping Details" />
  
      
       <CheckoutSteps activeStep={0} /> 
        <div className="shippingContainer">
          <div className="shippingBox">
            <h2 className="shippingHeading">Shipping Details</h2>
  
            <form
              className="shippingForm"
              encType="multipart/form-data"
              onSubmit={shippingSubmit}
            >
               <div>
                {HomeIcon} 
                <input
                  type="text"
                  placeholder="Address"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
  
               <div>
                {LocationCityIcon} 
                <input
                  type="text"
                  placeholder="City"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
  
              <div>
                {PinDropIcon} 
                <input
                  type="number"
                  placeholder="Pin Code"
                  required
                  value={pinCode}
                  onChange={(e) => setPinCode(e.target.value)}
                />
              </div>
  
              <div>
                {PhoneIcon} 
                <input
                  type="number"
                  placeholder="Phone Number"
                  required
                  value={phoneNo}
                  onChange={(e) => setPhoneNo(e.target.value)}
                  size="10"
                />
              </div>
  
              <div>
                {PublicIcon} 
  
                <select
                  required
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                >
                  <option value="">Country</option>
                  {Country &&
                    Country.getAllCountries().map((item) => (
                      <option key={item.isoCode} value={item.isoCode}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>

              {country && (
                <div>
                  {TransferWithinAStationIcon} 
  
                  <select
                    required
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  >
                    <option value="">State</option>
                    {State &&
                      State.getStatesOfCountry(country).map((item) => (
                        <option key={item.isoCode} value={item.isoCode}>
                          {item.name}
                        </option>
                      ))}
                  </select>
                </div>
              )}
 
              <input
                type="submit"
                value="Continue"
                className="shippingBtn"
                disabled={state ? false : true}
              />  
            </form>
          </div>
        </div> 
      </Fragment>
    )
}

export default Shipping
