import React from "react";
import classnames from "classnames";
import { Button, TextInput, Loading, ProgressBar } from "@carbon/react";
import styles from "./lists-dashboard.scss";
import { usePatientListing } from "../hooks/usePatientListing";
import DataTable from "react-data-table-component";
import SsemrListTabComponent from "../components/tab/ssemr-list-tab.component";
import Header from "../components/header/header.component";

const customDatatableStyles = {
  head: {
    style: {
      fontWeight: 700,
      fontSize: "14px",
    },
  },
  table: {
    style: {
      paddingBottom: "2rem",
    }
  }
};

const FilterComponent = ({ filterText, onFilter, onClear }) => (
  <div className={styles.filterComponent}>
    <TextInput
      size="sm"
      className={styles.searchInput}
      type="text"
      value={filterText}
      onChange={onFilter}
      placeholder="Search...."
    />
    <Button size="sm" onClick={onClear} kind="danger">
      Clear
    </Button>
  </div>
);

const ListsDashboard: React.FC = () => {
  const {
    tabs,
    currentTab,
    tableHeaders,
    handleTabChange,
    filterText,
    setFilterText,
    resetPaginationToggle,
    setResetPaginationToggle,
    loading,
    filteredTableData,
  } = usePatientListing();

  const SubHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle((prev) => !prev);
        setFilterText("");
      }
    };
    return (
      <FilterComponent
        onFilter={(evt) => setFilterText(evt.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);

  return (
    <main
      className={classnames("omrs-main-content", styles.dashboardContainer)}
      data-testid="patient-list-dashboard"
    >
      <section className={styles.dashboard}>
        <Header />
        <div className={styles.tabs}>
          {tabs.map((tab, index) => (
            <SsemrListTabComponent
              name={tab.text}
              activeClassName={tab.activeClassName}
              inertClassName={tab.interClassName}
              handler={() => handleTabChange(index)}
              isActive={index === currentTab}
            />
          ))}
        </div>
        {loading && <ProgressBar />}
        <div className={styles.listsTableContainer} data-testid="patient-list-table">
          <DataTable
            customStyles={customDatatableStyles}
            paginationPerPage={15}
            paginationResetDefaultPage={resetPaginationToggle}
            subHeader
            subHeaderComponent={SubHeaderComponentMemo}
            columns={tableHeaders}
            data={filteredTableData}
            pagination
            noDataComponent={
              filteredTableData?.length < 1 && loading ? (
                <div>
                  <div>
                    <div className={styles.noRecords}>
                      <p className={styles.noRecordsText} data-testid="no-records">
                        Please wait as we fetch the clients. This may take up to a few
                        seconds.
                      </p>
                    </div>
                    <Loading small className={styles.spinner} withOverlay={false} />
                  </div>
                </div>
              ) : (
                <div className={styles.noRecords}>
                  <p className={styles.noRecordsText}>This patient does not exist in the system.</p>
                </div>
              )
            }
          />
        </div>
      </section>
    </main>
  );
};

export default ListsDashboard;
