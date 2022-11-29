function TasksListHeader() {
    return (
        <div className="box sticky-top bg-white" id="header-section">
            <div className="row">
                <div className="col-3 header-col">Name</div>
                <div className="col-3 header-col">Status</div>
                <div className="col-6 header-col">Actions</div>
            </div>
        </div>
    );
}

export default TasksListHeader;
