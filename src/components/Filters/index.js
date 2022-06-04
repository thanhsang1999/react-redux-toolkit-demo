import { Col, Input, Radio, Row, Select, Tag, Typography } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { filtersSlice } from './filtersSlice';

const { Search } = Input;

export default function Filters() {
  /**
   * State
   */
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('All');
  const [priorities, setPriorities] = useState([]);
  /**
   * Redux
   */
  const dispatch = useDispatch();
  const { prioritiesFilterChange, searchFilterChange, statusFilterChange } =
    filtersSlice.actions;
  /**
   * Function Handle
   */
  /**
   *
   * @param {Event} e
   */
  function handleTextSearch(e) {
    setSearch(e.target.value);
    dispatch(searchFilterChange(e.target.value));
  }
  /**
   *
   * @param {Event} e
   */
  function handleChangeStatus(e) {
    setStatus(e.target.value);
    dispatch(statusFilterChange(e.target.value));
  }
  function handleChangePriorities(e) {
    setPriorities(e);
    dispatch(prioritiesFilterChange(e));
  }
  /**
   * Return
   */
  return (
    <Row justify='center'>
      <Col span={24}>
        <Typography.Paragraph
          style={{ fontWeight: 'bold', marginBottom: 3, marginTop: 10 }}
        >
          Search
        </Typography.Paragraph>
        <Search
          value={search}
          onChange={handleTextSearch}
          placeholder='input search text'
        />
      </Col>
      <Col sm={24}>
        <Typography.Paragraph
          style={{ fontWeight: 'bold', marginBottom: 3, marginTop: 10 }}
        >
          Filter By Status
        </Typography.Paragraph>
        <Radio.Group value={status} onChange={handleChangeStatus}>
          <Radio value='All'>All</Radio>
          <Radio value='Completed'>Completed</Radio>
          <Radio value='Todo'>To do</Radio>
        </Radio.Group>
      </Col>
      <Col sm={24}>
        <Typography.Paragraph
          style={{ fontWeight: 'bold', marginBottom: 3, marginTop: 10 }}
        >
          Filter By Priority
        </Typography.Paragraph>
        <Select
          mode='multiple'
          allowClear
          placeholder='Please select'
          style={{ width: '100%' }}
          value={priorities}
          onChange={handleChangePriorities}
        >
          <Select.Option value='High' label='High'>
            <Tag color='red'>High</Tag>
          </Select.Option>
          <Select.Option value='Medium' label='Medium'>
            <Tag color='blue'>Medium</Tag>
          </Select.Option>
          <Select.Option value='Low' label='Low'>
            <Tag color='gray'>Low</Tag>
          </Select.Option>
        </Select>
      </Col>
    </Row>
  );
}
