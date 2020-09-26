import React, { useEffect, useState, useCallback } from "react";
import { connect } from 'react-redux';
import { PageLayout } from "../../../shared"
import { Card, Layout, Page, Modal, Stack, TextField, ResourceList, Filters, Avatar, ResourceItem, TextStyle, FormLayout, List, Select, Pagination } from "@shopify/polaris";
import { PlusMinor } from '@shopify/polaris-icons';
import { HeartMajorMonotone } from '@shopify/polaris-icons';
import { Api } from "../../../shared";
import DatePicker from "react-datepicker";
import { StringUtils, Constants } from '../../../utils'

let offset = 0
let limit = Constants.LIMIT

function OrganizerEvent(props) {

  const [bloodEvents, setBloodEvents] = useState([]);
  const [rawBloodEvents, setRawBloodEvents] = useState([]);

  // HANDLE INPUT ERROR
  const [eventError, setEventError] = useState('');
  const [locationError, setLocationError] = useState('');

  const checkError = (eventName, eventLocation) => {
    if (StringUtils.isEmpty(eventName))
      setEventError("Event name cannot be empty")
    if (!StringUtils.isEmpty(eventName))
      setEventError('')
    if (StringUtils.isEmpty(eventLocation))
      setLocationError("Event location cannot be empty")
    if (!StringUtils.isEmpty(eventLocation))
      setLocationError('')
  }

  const resetError = () => {
    setEventError('')
    setLocationError('')
  }

  // PAGINATION HANDLING
  //const [offset, setOffset] = useState(0);
  //const [limit, setLimit] = useState(4);

  // USED TO SHOW LOADING SPINNER FOR LOADING EVENTS
  const [isLoading, setIsLoading] = useState(true);

  const getEvents = () => {
    setIsLoading(true)
    let payload = {
      offset: offset,
      limit: limit
    }
    Api.getBloodEvents(payload, (isSuccess, response, error) => {
      if (isSuccess) {
        // CHANGE FROM UNIX TIME TO DATETIME

        // IF THERE ARE NO EVENTS AVAILABLE
        if (response.data.data.length === 0) {
          setBloodEvents([])
          setRawBloodEvents([])
          setIsLoading(false)
        } else {
          // CHANGE FROM UNIX TIME TO DATETIME
          for (let i = 0; i < response.data.data.length; i++) {
            let event_date = response.data.data[i].event_date;
            response.data.data[i].event_date = StringUtils.getDate(event_date)
            response.data.data[i].id = response.data.data[i].event_id
          }
          let tempEvents = JSON.parse(JSON.stringify(response.data.data))
          let sortedEvents = sortBloodEvents(sortValue, tempEvents)
          setBloodEvents(handleQueryValueChange(queryValue, sortedEvents));
          // NOTE THAT WE DONT FILTER THE RAW BLOOD EVENTS BECAUSE WE NEED IT TO SET IT BACK TO NORMAL WHEN NOT FILTERING
          setRawBloodEvents(sortedEvents);
          setIsLoading(false)
        }
      } else {
        setBloodEvents([])
        setRawBloodEvents([])
        setIsLoading(false)
      }
    })
  };

  //COMPONENT DID MOUNT
  useEffect(() => {
    console.log("User type: ", props.userType)
    getEvents();
  }, [])

  // HANDLE EDIT EVENT
  const [eventEditId, setEventEditId] = useState(''); // EVENT ID
  const [eventEditRcName, seteventEditRcName] = useState(''); // RED CROSS ID
  const [eventEditOrgName, seteventEditOrgName] = useState(''); // ORGANIZER ID
  const [eventEditName, setEventEditName] = useState('');
  const [eventEditDate, setEventEditDate] = useState(new Date());
  const [eventEditLocation, setEventEditLocation] = useState('');
  const [eventEditStatus, setEventEditStatus] = useState('');

  // CREATE EVENT STATE AND HANDLE CREATE EVENT
  const [eventName, setEventName] = useState('');
  const [eventLocation, setEventLocation] = useState('');

  const handleEventChange = useCallback((value) => {
    setEventName(value)
  }, []);

  const handleEventLocationChange = useCallback((value) => {
    setEventLocation(value)
  }, []);

  const handleEventDateChange = useCallback((date) => {
    // CHECK IF SET DATE SMALLER THAN CURRENT DATE MEANING IT IS INVALID, ONLY SET IF DATE LARGER AKA IN THE FUTURE
    if (new Date(date) > new Date())
      setEventEditDate(new Date(date))
    else setEventEditDate(new Date())
  }, []);

  // CREATE AND HANDLE SHCEDULE EVENT MODAL

  const [active, setActive] = useState(false);

  const handleModalChange = useCallback(() => setActive(!active), [active]);

  const handleClose = () => {
    handleModalChange();
    setEventName('');
    setEventLocation('');
    resetError();
    setSelectedDates(new Date());
  };

  const handleCreate = () => {
    let unixDate = (selectedDates.getTime() / 1000).toFixed(0)
    if (!StringUtils.isEmpty(eventName) && !StringUtils.isEmpty(eventLocation)) {
      setEventError('')
      setLocationError('')
      let payload = {
        name: eventName,
        location: eventLocation,
        date: unixDate
      }
      Api.createBloodEvent(payload, (isSuccess, response, error) => {
        if (isSuccess) {
          // SET MODAL TO FALSE TO CLOSE THE CREATE MODAL
          handleClose()
          setEventName('')
          setEventLocation('')
          setSelectedDates(new Date())
          // UPDATE THE EVENT LIST TO FETCH THE LATEST EVENT
          getEvents()
        } else {
          if (error.response.status === 500)
            setLocationError("Event location cannot be empty")
          else
            setLocationError(error.response.data.error || error.response.data.message)
        }
      })
    } else {
      checkError(eventName, eventLocation);
    }
  }

  // CREATE AND HANDLE UPDATE EVENT MODAL
  const [updateModalActive, setUpdateModalActive] = useState(false);

  const handleUpdateModalClose = useCallback(() => {
    setUpdateModalActive(!updateModalActive)
    resetError();
  }, [updateModalActive]);

  const handleUpdate = () => {
    if (!StringUtils.isEmpty(eventEditName) && !StringUtils.isEmpty(eventEditLocation)) {
      let payload = {
        event_id: eventEditId,
        editedEvent: {
          date: (eventEditDate.getTime() / 1000).toFixed(0),
          name: eventEditName,
          location: eventEditLocation,
          status: eventEditStatus
        }
      }
      console.log("payload in handle update: ", payload)

      Api.updateBloodEvent(payload, (isSuccess, response, error) => {
        if (isSuccess) {
          setUpdateModalActive(false)
          getEvents()
        } else {
          console.log("ERROR IN UPDATE BLOOD EVENT, ", error)
          if (error.response.status === 500)
            setLocationError("Event location cannot be empty")
          else
            setLocationError(error.response.data.error || error.response.data.message)
        }
      })
    } else {
      checkError(eventEditName, eventEditLocation);
    }
  };

  const handleEditItem = useCallback((eventId) => {
    Api.getBloodEvent(eventId, (isSuccess, response, error) => {
      if (isSuccess) {
        setEventEditId(response.data.data.event_id)
        seteventEditRcName(response.data.data.red_cross_name)
        seteventEditOrgName(response.data.data.organizer_name)
        // SET DATE TO EPOCH FIRST TIME (1970-1-1) AND THEN SET ITS UNIX TO CORRECT VALUE
        setEventEditDate(new Date(response.data.data.event_date * 1000))
        setEventEditName(response.data.data.name)
        setEventEditLocation(response.data.data.location)
        setEventEditStatus(response.data.data.status)
      } else {
        console.log("ERROR IN GETTING ONE BLOOD EVENT !", error)
      }
    })
    setUpdateModalActive(!updateModalActive)
  }, [updateModalActive]);

  const handleChange = useCallback(() => setActive(!active), [active]);

  // HANDLE DATE PICKER

  const [selectedDates, setSelectedDates] = useState(new Date());

  const handleSetSelectedDates = useCallback((date) => {
    if (new Date(date) > new Date())
      setSelectedDates(new Date(date))
    else setSelectedDates(new Date())
  }, [])

  // HANDLE RESOURCE LIST
  const [selectedItems, setSelectedItems] = useState([]);
  const [sortValue, setSortValue] = useState('DATE_LATEST');
  const [taggedWith, setTaggedWith] = useState('VIP');
  const [queryValue, setQueryValue] = useState("");

  const handleQueryValueChange =
    (value, array) => {
      //setQueryValue(value)
      //let filteredEvents = rawBloodEvents;
      let filteredEvents = JSON.parse(JSON.stringify(array));
      filteredEvents = filteredEvents.filter((event) => {
        let name = event.name.toLowerCase()
        return name.includes(value.toLowerCase());
      })
      //setBloodEvents(filteredEvents)
      setQueryValue(value)
      //setBloodEvents()
      console.log("FILTERED EVENTS: ", filteredEvents)
      return filteredEvents
    }

    ;
  const handleTaggedWithRemove = useCallback(() => setTaggedWith(null), []);
  const handleQueryValueRemove = useCallback(() => setQueryValue(null), []);
  const handleClearAll = useCallback(() => {
    handleTaggedWithRemove();
    handleQueryValueRemove();
  }, [handleQueryValueRemove, handleTaggedWithRemove]);

  const resourceName = {
    singular: 'event',
    plural: 'events',
  };

  // HANDLE DELETE EVENTS

  const [modalDelete, setModalDelete] = useState(false);

  const handleModalDeleteChanged = useCallback(() => setModalDelete(!modalDelete), [modalDelete])

  const promotedBulkActions = [
    {
      content: 'Delete events',
      onAction: handleModalDeleteChanged
    },
  ];

  const handleDelete = () => {
    let ids = []
    for (let i = 0; i < selectedItems.length; i++) {
      ids.push({
        id: selectedItems[i]
      })
    }
    Api.deleteBloodEvents({
      ids: ids
    }, (isSuccess, response, error) => {
      if (isSuccess) {
        // RE-RENDER THE LIST
        getEvents()
      } else {
        console.log("ERROR IN DELETING EVENTS, ", error)
      }
    })
    handleModalDeleteChanged()
  }

  // HANDLE SORT EVENTS

  const sortBloodEvents = (selected, array) => {
    function sortASC(a, b) {
      let returnVal = -99
      a.name < b.name ? returnVal = -1 : a.name > b.name ? returnVal = 1 : returnVal = 0
      return returnVal;
    }

    function sortDESC(a, b) {
      let returnVal = -99
      a.name < b.name ? returnVal = 1 : a.name > b.name ? returnVal = -1 : returnVal = 0
      return returnVal;
    }

    function sortLatest(a, b) {
      return new Date(b.event_date) - new Date(a.event_date)
    }

    function sortOldest(a, b) {
      return new Date(a.event_date) - new Date(b.event_date)
    }

    // NEED TO SORT BOTH BECAUSE WHEN SEARCHING, WE BASE ON RAWBLOODEVENTS NOT BLOODEVENTS
    // SO WE SORT RAWBLOODEVENTS SO THAT SEARCHING DOES NOT BREAK SORTING

    let arr = JSON.parse(JSON.stringify(array));

    if (selected === "NAME_MODIFIED_ASC") {
      arr.sort(sortASC)
    } else if (selected === "NAME_MODIFIED_DESC") {
      arr.sort(sortDESC)
    } else if (selected === "DATE_OLDEST") {
      arr.sort(sortOldest)
    } else if (selected === "DATE_LATEST") {
      arr.sort(sortLatest)
    }
    return arr;
  }

  const filters = [
  ];

  const filterControl = (
    <Filters
      queryValue={queryValue}
      filters={filters}
      onQueryChange={(queryVal) => {
        // FILTER FIRST THEN CHANGE BLOOD EVENTS
        setBloodEvents(handleQueryValueChange(queryVal, rawBloodEvents))
      }}
      onQueryClear={handleQueryValueRemove}
      onClearAll={handleClearAll}
    >
    </Filters>
  );

  const options = [
    { label: 'Pending', value: 'pending' },
    { label: 'Approved', value: 'approved' },
    { label: 'Rejected', value: 'rejected' },
  ];

  const ExampleCustomTimeInput = ({ value, onChange }) => (
    <input
      value={value}
      onChange={e => onChange(e.target.value)}
      style={{ border: "solid 1px pink" }}
    />
  );

  return (
    <PageLayout userName={props.userName}
      userType={props.userType}
      title={"Managing Event"}
      expectedUserType={"organizer"}
      navigationArray={[
        {
          label: 'Manage Event',
          icon: HeartMajorMonotone,
          onClick: () => {
            //DO NOT THING BECAUSE ALREADY AT THIS ROUTE
          },
        },
      ]}
    >
      <Page
        fullWidth
        title="Manage Event"
        subtitle={bloodEvents.length ? "Schedule, update or delete events" : "No events available"}
        primaryAction={{ content: 'Create order', icon: PlusMinor, destructive: true, onAction: handleChange }}
      >
        <Modal
          open={updateModalActive}
          onClose={handleUpdateModalClose}
          title="Edit this event"
          primaryAction={{
            content: 'Confirm',
            onAction: handleUpdate,
          }}
          secondaryActions={[
            {
              content: 'Cancel',
              onAction: handleUpdateModalClose,
            },
          ]}
        >
          <Modal.Section>
            <Stack vertical>
              <Stack.Item>
                <Layout>
                  <Layout.AnnotatedSection
                    description="Blood donors and red cross will use this information, so edit carefully."
                  >
                    <FormLayout>
                      <FormLayout.Group condensed>
                        <TextField
                          value={eventEditName}
                          label="Event name"
                          onChange={useCallback((value) => {
                            setEventEditName(value)
                          }, [])}
                          error={eventError === '' ? null : eventError}
                        />
                        <TextField
                          value={eventEditLocation}
                          label="Event location"
                          onChange={useCallback((value) => {
                            setEventEditLocation(value)
                          }, [])}
                          error={locationError === '' ? null : locationError}
                        />
                        <Select
                          label="Status"
                          options={options}
                          onChange={useCallback((value) => {
                            setEventEditStatus(value)
                          }, [])}
                          value={eventEditStatus}
                          disabled
                        />

                      </FormLayout.Group>

                      <List>
                        <List.Item>
                          Event ID: {eventEditId}
                        </List.Item>
                        <List.Item>
                          Red Cross name: {eventEditRcName}
                        </List.Item>
                        <List.Item>
                          Organizer name: {eventEditOrgName}
                        </List.Item>
                      </List>
                      <DatePicker
                        selected={eventEditDate}
                        onChange={handleEventDateChange}
                        timeInputLabel="Time:"
                        showTimeInput
                        customTimeInput={<ExampleCustomTimeInput />}
                      />
                    </FormLayout>
                  </Layout.AnnotatedSection>
                </Layout>
              </Stack.Item>
            </Stack>
          </Modal.Section>
        </Modal>

        <Modal
          open={active}
          onClose={handleClose}
          title="Schedule a new event"
          primaryAction={{
            content: 'Create',
            onAction: handleCreate,
          }}
          secondaryActions={[
            {
              content: 'Cancel',
              onAction: handleClose,
            },
          ]}
        >
          <Modal.Section>
            <Stack vertical>
              <Stack.Item>
                <TextField
                  value={eventName}
                  label="Event name"
                  onChange={handleEventChange}
                  error={eventError === '' ? null : eventError}
                />
              </Stack.Item>
              <Stack.Item>
                <TextField
                  value={eventLocation}
                  label="Location"
                  onChange={handleEventLocationChange}
                  error={locationError === '' ? null : locationError}
                />
              </Stack.Item>
              <Stack.Item>
                <div>Event date</div>
                <DatePicker
                  selected={selectedDates}
                  onChange={handleSetSelectedDates}
                  timeInputLabel="Time:"
                  showTimeInput
                  customTimeInput={<ExampleCustomTimeInput />}
                />
              </Stack.Item>
            </Stack>
          </Modal.Section>
        </Modal>

        <Modal
          open={modalDelete}
          onClose={handleModalDeleteChanged}
          title="Delete events"
          primaryAction={{
            content: 'Confirm',
            onAction: handleDelete,
          }}
          secondaryActions={[
            {
              content: 'Cancel',
              onAction: handleModalDeleteChanged,
            },
          ]}
        >
          <Modal.Section>
            <Stack vertical>
              <Stack.Item>
                <TextStyle variation="strong">Are you sure you want to delete these events ?</TextStyle>
              </Stack.Item>
            </Stack>
          </Modal.Section>
        </Modal>

        <Layout>
          <Layout.Section>
            <Card title="Events">

              <ResourceList
                resourceName={resourceName}
                items={bloodEvents}
                renderItem={renderItem}
                selectedItems={selectedItems}
                onSelectionChange={(item) => {
                  setSelectedItems(item);
                  console.log(selectedItems);
                }}
                promotedBulkActions={promotedBulkActions}
                sortValue={sortValue}
                sortOptions={[
                  { label: 'Sort DESC alphabet', value: 'NAME_MODIFIED_DESC' },
                  { label: 'Sort ASC alphabet', value: 'NAME_MODIFIED_ASC' },
                  { label: 'Latest date', value: 'DATE_LATEST' },
                  { label: 'Oldest date', value: 'DATE_OLDEST' },
                ]}
                onSortChange={(selected) => {
                  setSortValue(selected);
                  setBloodEvents(sortBloodEvents(selected, bloodEvents));
                  setRawBloodEvents(sortBloodEvents(selected, rawBloodEvents));
                  console.log(`Sort option changed to ${selected}.`);
                }}
                filterControl={filterControl}
                loading={isLoading}
              />

            </Card>

          </Layout.Section>
        </Layout>
      </Page>
      <div className="outer">
        <div className="inner">
          <Pagination
            hasPrevious
            onPrevious={() => {
              console.log("OFFSET NOW =============: ", offset)
              if (offset > 0) {
                offset -= Constants.LIMIT
                getEvents()
              }
            }}
            hasNext
            onNext={() => {
              if (rawBloodEvents.length !== 0) {
                // MEANING THAT IT HAS NOT REACHED THE END OF THE LIST
                if (rawBloodEvents.length === 3) {
                  offset += Constants.LIMIT
                  getEvents()
                }
              }
            }}
          />
        </div>
      </div>
    </PageLayout>
  );

  function renderItem(item) {
    const { event_id, name, location, latestOrderUrl, event_date, status } = item;
    const shortcutActions = latestOrderUrl
      ? [{ content: 'View latest order', url: latestOrderUrl }]
      : null;
    return (
      <ResourceItem
        id={event_id}
        url={null} // set this to null to remove navigation url trigger
        accessibilityLabel={`View details for ${name}`}
        persistActions
        shortcutActions={shortcutActions}
        onClick={handleEditItem}
      >
        <h3>
          <div>
            Name: {" "}
            <TextStyle variation="strong">{name}</TextStyle>
          </div>
        </h3>
        <div>Date: {event_date}</div>
        <div>Location: {location}</div>
        <div>status: {" "}
          <TextStyle variation="strong">
            {status}
          </TextStyle>
        </div>
      </ResourceItem>
    );
  }
}

export default connect(state => ({
  userName: state.AuthenticationReducer.userName,
  email: state.AuthenticationReducer.email,
  userType: state.AuthenticationReducer.userType,
  userId: state.AuthenticationReducer.userId
}))(OrganizerEvent);

