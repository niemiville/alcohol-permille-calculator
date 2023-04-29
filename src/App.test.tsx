import { shallow } from 'enzyme';
import { PermilleForm } from './components/PermilleForm';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('PermilleForm component', () => {
  let wrapper:any;

  beforeEach(() => {
    wrapper = shallow(<PermilleForm />);
  });

  it('renders without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('displays the BAC Calculator header', () => {
    expect(wrapper.find('Typography').at(0).text()).toEqual('BAC Calculator');
  });

  it('updates the milliliters field when the input changes', () => {
    const millilitersInput = wrapper.find('#milliliters');
    millilitersInput.simulate('change', { target: { name: 'milliliters', value: '100' } });
    expect(wrapper.find('#milliliters').props().value).toEqual('100');
  });

  it('updates the percent field when the input changes', () => {
    const percentInput = wrapper.find('#percent');
    percentInput.simulate('change', { target: { name: 'percent', value: '40' } });
    expect(wrapper.find('#percent').props().value).toEqual('40');
  });

  it('updates the kilograms field when the input changes', () => {
    const kilogramsInput = wrapper.find('#kilograms');
    kilogramsInput.simulate('change', { target: { name: 'kilograms', value: '80' } });
    expect(wrapper.find('#kilograms').props().value).toEqual('80');
  });

  it('updates the sex field when the radio button changes', () => {
    const femaleRadioButton = wrapper.find('FormControlLabel').at(1).find('input');
    femaleRadioButton.simulate('change', { target: { value: 'female' } });
    expect(wrapper.find('RadioGroup').props().value).toEqual('female');
  });

  it('calculates the permilles when the form is submitted', () => {
    const formValues = {
      milliliters: 250,
      percent: 5,
      kilograms: 70,
      sex: 'male'
    };
  
    // get the component instance from the wrapper
    const instance = wrapper.instance();
  
    // set the form data state
    instance.setState({ formData: formValues });
  
    // simulate form submission
    wrapper.find('form').simulate('submit', { preventDefault() {} });
  
    // calculate expected permilles
    const expectedPermilles = 0.21;
  
    // assert that the permilles state was updated
    expect(instance.state.permilles).toBeCloseTo(expectedPermilles, 2);
  });

});
